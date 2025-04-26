import { Component, inject, OnInit } from '@angular/core';
import { ChatHistoryService } from '../../services/chat-history.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AiService } from '../../../../core/services/ai.service';

@Component({
    selector: 'app-chat-history',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './chat-history.component.html',
    styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent implements OnInit {
  
  #chatHistoryService = inject(ChatHistoryService);
  #aiService = inject(AiService)

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

  sendPrompt(){
    this.#aiService.ask(this.promptMsg)
  }

}
