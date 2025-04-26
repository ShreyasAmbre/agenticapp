import { inject, Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getVertexAI, getGenerativeModel, GenerativeModel, ChatSession, FunctionDeclarationsTool, FunctionCall, GenerateContentResult } from "firebase/vertexai";
import { ProductService } from '../../features/products/services/product.service';
import { Product } from '../../features/products/models/product.model';
import { SchemaType } from "firebase/vertexai";

@Injectable({
  providedIn: 'root'
})
export class AiService {
  
  #productService = inject(ProductService)
  #firebaseApp = inject(FirebaseApp);

  private readonly model: GenerativeModel;
  private readonly chat: ChatSession;


  constructor() { 
    const productsToolSet: FunctionDeclarationsTool = {
      functionDeclarations: [
        {
          name: "getNumberOfProducts",
          description: "Get a count of number of products available in the inventory"
        },
        {
          name: "getAllProducts",
          description: "Get an array of a products with the name and price of the each product"
        },
        {
          name: "getCart",
          description: "Get an array of a products which is present in cart"
        },
        {
          name: 'addToCart',
          description: "Add product to the cart",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              id: { type: SchemaType.NUMBER, description: "ID of the product" },
              name: { type: SchemaType.STRING, description: "Name of the product" },
              price: { type: SchemaType.NUMBER, description: "Price of the product" }
            },
            required: ["id", "name", "price"]
          }
        }
      ]
    }
    const vertexAI = getVertexAI(this.#firebaseApp);
    const systemInstruction = "Welcom to Fruit Store. you are superstar agent for this ecommerce store. you will assist users by answering question about the inventory and event being able to add items to the cart"
    this.model = getGenerativeModel(vertexAI, {
      model: 'gemini-2.0-flash',
      systemInstruction: systemInstruction,
      tools: [productsToolSet]
    })

    this.chat = this.model.startChat();
  }

  async callFunctions(functionCalls: FunctionCall[]): Promise<GenerateContentResult>{
    let result;

    for (const functionCall of functionCalls) {
      if(functionCall.name === 'getNumberOfProducts'){
        const functionResult = this.#productService.getNumberOfProducts();
        result = await this.chat.sendMessage([
          {
            functionResponse: {
              name: functionCall.name,
              response: { numberOfItems: functionResult }
            }
          }
        ])

        const fnCalls = result.response.functionCalls();
        if(fnCalls){
          return this.callFunctions(fnCalls)
        }
      }
      if(functionCall.name === 'getCart'){
        const functionResult = this.#productService.getCart();
        result = await this.chat.sendMessage([
          {
            functionResponse: {
              name: functionCall.name,
              response: { productsInCart: functionResult }
            }
          }
        ])

        const fnCalls = result.response.functionCalls();
        if(fnCalls){
          return this.callFunctions(fnCalls)
        }
      }
      if(functionCall.name === 'getAllProducts'){
        const functionResult = this.#productService.getAllProducts();
        console.log("P LISt =>", functionResult)
        result = await this.chat.sendMessage([
          {
            functionResponse: {
              name: functionCall.name,
              response: { products: functionResult }
            } 
          }
        ])

        const fnCalls = result.response.functionCalls();
        if(fnCalls){
          return this.callFunctions(fnCalls)
        }
      }
      if(functionCall.name === 'addToCart'){
        const args = functionCall.args as { id: number; name: string; price: number };
        const product: Product = {
          id: args.id,
          name: args.name,
          price: args.price,
          imageUrl: ''
        };
        const functionResult = this.#productService.addToCart(product);
        result = await this.chat.sendMessage([
          {
            functionResponse: {
              name: functionCall.name,
              response: { success: functionResult }
            }
          }
        ])

        const fnCalls = result.response.functionCalls();
        if(fnCalls){
          return this.callFunctions(fnCalls)
        }
      }
      
    }
    return result!;

  }


  async ask(prompt: string){
    let result = await this.chat.sendMessage(prompt);
    const functionCalls = result.response.functionCalls();


    if(functionCalls){
      result = await this.callFunctions(functionCalls);
    }
    // if(functionCalls && functionCalls.length > 0){
    //   for (const functionCall of functionCalls) {
    //     switch (functionCall.name) {
    //       case 'getNumberOfProducts': {
    //         const functionResult = this.#productService.getNumberOfProducts();
    //         result = await this.chat.sendMessage([
    //           {
    //             functionResponse: {
    //               name: functionCall.name,
    //               response: { numberOfItems: functionResult }
    //             }
    //           }
    //         ])
    //         break;
    //       }
    //       case 'getProducts': {
    //         const functionResult = this.#productService.productList();
    //         result = await this.chat.sendMessage([
    //           {
    //             functionResponse: {
    //               name: functionCall.name,
    //               response: { products: functionResult }
    //             }
    //           }
    //         ])
    //         break;
    //       }
    //       case 'addToCart': {
    //         const args = functionCall.args as { id: number; name: string; price: number };
    //         const product: Product = {
    //           id: args.id,
    //           name: args.name,
    //           price: args.price,
    //           imageUrl: ''
    //         };
    //         const functionResult = this.#productService.addToCart(product);
    //         result = await this.chat.sendMessage([
    //           {
    //             functionResponse: {
    //               name: functionCall.name,
    //               response: { success: true }
    //             }
    //           }
    //         ])
    //         break;
    //       }
          
    //       default:
    //         break;
    //     }
        
    //   }
    // }
    console.log("RESPONSE  =>", result)
    return result.response.text();
  }
}
