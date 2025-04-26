import { Component, inject, OnInit } from '@angular/core';
import { ChatHistoryService } from '../../services/chat-history.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AiService } from '../../../../core/services/ai.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat-history',
    imports: [CommonModule, FormsModule],
    standalone: true,
    templateUrl: './chat-history.component.html',
    styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent implements OnInit {
  
  #chatHistoryService = inject(ChatHistoryService);
  #aiService = inject(AiService);

  chatHistory = this.#chatHistoryService.chatHistoryData;
  promptMsg: string = ''

  ngOnInit(): void {
    this.getAllChatHistory()
  }
  
  getAllChatHistory(){
    this.#chatHistoryService.getChatHistory().subscribe(response => {
      this.#chatHistoryService.chatHistoryData.set(response)
    });
  }

  async sendPrompt(){
    const question = this.promptMsg
    if(!question){
      return;
    }

    this.#chatHistoryService.chatHistoryData.update((value) => [
      ...value,
      {
        id: 0,
        dateTime: new Date().toISOString(),
        senderName: "Customer",
        message: question,
        isSender: true,
      }
    ])

    const response = await this.#aiService.ask(this.promptMsg);
    console.log("RS=>", response)
    this.promptMsg = ''
    this.#chatHistoryService.chatHistoryData.update((value) => [
      ...value,
      {
        id: 0,
        dateTime: new Date().toISOString(),
        senderName: "Fruity AI Agent",
        message: response,
        isSender: false,
      }
    ])
  }

}
