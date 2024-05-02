import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import {EventService} from "../../service/event/event.service";
@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent {
  constructor(private eventService: EventService,private router: Router) { }

  newEvent: Event = {
    id: 0,
    titre: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    lieu: '',
    imageUrl: ''
  };


  addEvent() {
    this.eventService.addEvent(this.newEvent).subscribe(
      (data: any) => {
        console.log('Evénement ajouté avec succès : ', data);
        alert('Événement ajouté avec succès !');
        this.router.navigate(['admin/events']);

        this.newEvent = {
          id: 0,
          titre: '',
          description: '',
          dateDebut: new Date(),
          dateFin: new Date(),
          lieu: '',
          imageUrl: ''
        };
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de l\'événement : ', error);
        alert('Une erreur s\'est produite lors de l\'ajout de l\'événement : ' + error.message);
      }
    );
  }
}
