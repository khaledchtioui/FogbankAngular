import { Component, OnInit } from '@angular/core';
import {EventService} from "../../service/event/event.service";
import { WebSocketService } from 'src/app/service/websocket/web-socket.service';
import { Message } from 'src/app/models/message';



@Component({
  selector: 'app-get-events',
  templateUrl: './get-events.component.html',
  styleUrls: ['./get-events.component.css']
})
export class GetEventsComponent implements OnInit {

  events: any[] = []; // Vous devez définir la structure appropriée pour les événements
  newEvent: any = {}; // Pour stocker les données d'un nouvel événement
  messages: Message[] = [];
  newMessage: string = ''; // Pour stocker le nouveau message à envoyer


  constructor(private eventService: EventService, private webSocketService: WebSocketService, ) { }

  ngOnInit(): void {
    this.loadEvents();
        // Connect to WebSocket when component initializes
        this.webSocketService.connect('YourUsername');
        // Subscribe to WebSocket messages
        this.messages = this.webSocketService.getMessagesFromLocalStorage();
        this.webSocketService.connect('YourUsername');
        this.webSocketService.getMessageSubject().subscribe((message: any) => {
          this.messages.push(message);


        });    
  }

  ngOnDestroy(): void {
    // Disconnect from WebSocket when component is destroyed
    this.webSocketService.disconnect();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.events = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des événements : ', error);
      }
    );
  }

  addEvent() {
    this.eventService.addEvent(this.newEvent).subscribe(
      (data: any) => {
        console.log('Evénement créé avec succès : ', data);
        // Recharger la liste des événements après la création
        this.loadEvents();
        // Réinitialiser les données du nouvel événement
        this.newEvent = {};
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la création de l\'événement : ', error);
      }
    );
  }

  updateEvent(event: any) {
    this.eventService.updateEvent(event.id, event).subscribe(
      (data: any) => {
        console.log('Evénement mis à jour avec succès : ', data);
        // Recharger la liste des événements après la mise à jour
        this.loadEvents();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour de l\'événement : ', error);
      }
    );
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        console.log('Evénement supprimé avec succès');
        // Recharger la liste des événements après la suppression
        this.loadEvents();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'événement : ', error);
      }
    );
  }

 
  sendMessage() {
    if (this.newMessage) {
      // Ajoutez le message à la liste des messages localement
      this.messages.push({ sender: 'YourUsername',content: this.newMessage });
      
      // Envoi du message via WebSocket
      this.webSocketService.sendMessage({ sender: 'YourUsername', content: this.newMessage });

      this.newMessage = ''; // Effacer l'entrée après l'envoi du message
    }
  }


}
