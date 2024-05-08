import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject: Subject<any>;
  private localStorageKey = 'chatMessages';
  private broadcastChannel: BroadcastChannel;



  constructor() {
    this.messageSubject = new Subject<any>();
    this.loadMessagesFromLocalStorage();
    this.broadcastChannel = new BroadcastChannel('chatChannel');
    this.broadcastChannel.onmessage = (event) => {
      this.handleReceivedMessage(event.data);
    };
  }

  
  private handleReceivedMessage(message: any): void {
    this.messageSubject.next(message);
    this.saveMessageToLocalStorage(message);
  }

  private saveMessageToLocalStorage(message: any): void {
    let messages: any[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    messages.push(message);
    localStorage.setItem(this.localStorageKey, JSON.stringify(messages));
  }


  private loadMessagesFromLocalStorage(): void {
    const messages = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    messages.forEach((message: any)=> this.messageSubject.next(message));
  }

  sendMessage(message: any): void {
    this.broadcastChannel.postMessage(message);
  }

  connect(username: string): void {
    const socketUrl = 'ws://localhost:8087/ws';
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      // Tell your username to the server
      const message = {
        sender: username,
        type: 'JOIN'
      };
      this.sendMessage(message);
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageSubject.next(message); // Diffusez le message reçu aux abonnés
      this.saveMessageToLocalStorage(message); // Stockez le message dans le stockage local

    };


    this.socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  //sendMessage(message: any): void {
  //  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  //    this.socket.send(JSON.stringify(message));
  //  } else {
  //    console.error('WebSocket is not open');
 //   }
 // }

  getMessageSubject(): Subject<any> {
    return this.messageSubject;
  }

  getMessagesFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

}
