import { Component } from '@angular/core';
import {EventService} from "../../service/event/event.service";
@Component({
  selector: 'app-delete-events',
  templateUrl: './delete-events.component.html',
  styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent {
  eventToDelete: any;

  constructor(private eventService: EventService) { }

  deleteEvent() {

    alert('Fonctionnalité de suppression non implémentée.');
  }
}
