import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ChatHistory } from '../models/chat-history.model';
import { map, Observable, single, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  #http = inject(HttpClient)
  
  private chatHistoryDataUrl = 'assets/data/chatHistory.json';
  chatHistoryData = signal<ChatHistory[]>([])
  
  
  getChatHistory(): Observable<ChatHistory[]>{
    return this.#http.get<ChatHistory[]>(this.chatHistoryDataUrl).pipe(
      map((response:ChatHistory[]) => response)
    )
  }
}
