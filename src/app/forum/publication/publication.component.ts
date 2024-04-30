import {Component, Input} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  @Input() post!: PublicationInitiale;




}
