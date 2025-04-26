import { inject, Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getVertexAI, getGenerativeModel, GenerativeModel, ChatSession, FunctionDeclarationsTool } from "firebase/vertexai";
import { ProductService } from '../../features/products/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly model: GenerativeModel;
  private readonly chat: ChatSession;
  #productService = inject(ProductService)


  constructor(@Inject("FIREBASE_APP") private firebaseApp: FirebaseApp) { 
    const productsToolSet: FunctionDeclarationsTool = {
      functionDeclarations: [
        {
          name: "getNumberOfProducts",
          description: "Get a count of number of products available in the inventory"
        },
        {
          name: "getProducts",
          description: "Get an array of a products with the name and price of the each product"
        }
      ]
    }
    const vertexAI = getVertexAI(this.firebaseApp);
    const systemInstruction = "Welcom to Fruit Store. you are superstar agent for this ecommerce store. you will assist users by answering question about the inventory and event being able to add items to the cart"
    this.model = getGenerativeModel(vertexAI, {
      model: 'gemini-2.0-flash',
      systemInstruction: systemInstruction,
      tools: [productsToolSet]
    })

    this.chat = this.model.startChat();
  }


  async ask(prompt: string){
    let result = await this.chat.sendMessage(prompt);
    const functionCalls = result.response.functionCalls();

    if(functionCalls && functionCalls.length > 0){
      for (const functionCall of functionCalls) {
        switch (functionCall.name) {
          case 'getNumberOfProducts': {
            const functionResult = this.#productService.getNumberOfProducts();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { numberOfItems: functionResult }
                }
              }
            ])
            break;
          }
          case 'getProducts': {
            const functionResult = this.#productService.getProducts();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { products: functionResult }
                }
              }
            ])
            break;
          }
          default:
            break;
        }
        
      }
    }
  }
}
