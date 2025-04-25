import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getVertexAI, getGenerativeModel, GenerativeModel, ChatSession, FunctionDeclarationsTool } from "firebase/vertexai";

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly model: GenerativeModel;
  private readonly chat: ChatSession;


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
}
