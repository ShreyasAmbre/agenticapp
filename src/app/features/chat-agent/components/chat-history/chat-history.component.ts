import { Component, inject, OnInit } from '@angular/core';
import { ChatHistoryService } from '../../services/chat-history.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chat-history',
    imports: [CommonModule],
    templateUrl: './chat-history.component.html',
    styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent implements OnInit {
  
  #chatHistoryService = inject(ChatHistoryService)

  chatHistory = this.#chatHistoryService.chatHistoryData;

  ngOnInit(): void {
    this.getAllChatHistory()
  }
  
  getAllChatHistory(){
    this.#chatHistoryService.getChatHistory().subscribe(response => {
      this.#chatHistoryService.chatHistoryData.set(response)
    });
  }

}
