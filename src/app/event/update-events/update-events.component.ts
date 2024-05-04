import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event';
import {EventService} from "../../service/event/event.service";


@Component({
  selector: 'app-update-events',
  templateUrl: './update-events.component.html',
  styleUrls: ['./update-events.component.css']
})
export class UpdateEventsComponent implements OnInit {
  formevent!: FormGroup;
  updatedEvent: Event | undefined;
  id!: number;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEventDetails();
    this.formevent = new FormGroup({
      titre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      dateFin: new FormControl('', Validators.required),
      lieu: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });

  }

  getEventDetails() {
    const eventIdString = this.route.snapshot.paramMap.get('id');
    if (eventIdString !== null) {
      const eventId = +eventIdString;
      this.eventService.getEvent(eventId).subscribe(
        (data: Event) => {
          this.updatedEvent = data;
          this.formevent.patchValue(data);
        },
        (error) => {
          console.error('An error occurred while fetching event details:', error);
        }
      );
    }
  }

  updateEvent() {
    const eventId = this.id; // Utiliser directement l'ID de l'événement
    const eventData = this.formevent.value; // Obtenir les données du formulaire
    if (eventId) {
      this.eventService.updateEvent(eventId, eventData).subscribe(
        (data) => {
          console.log('Event updated successfully:', data);
          alert('Event updated successfully');
          this.router.navigate(['admin/events']); // Rediriger vers la liste des événements
        },
        (error: any) => {
          console.error('An error occurred while updating event:', error);
          alert('Error updating event');
        }
      );
    } else {
      console.error('Event ID is undefined');
    }
  }
}
