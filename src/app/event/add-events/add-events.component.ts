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

  imageUrl: string | ArrayBuffer | null = null;

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Stocke l'URL de l'image dans une variable du composant
    };

    reader.readAsDataURL(file);
}
}


