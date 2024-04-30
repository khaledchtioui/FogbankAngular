import {Component, Input} from '@angular/core';
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";

@Component({
  selector: 'app-reponse-publication-details',
  templateUrl: './reponse-publication-details.component.html',
  styleUrls: ['./reponse-publication-details.component.css']
})
export class ReponsePublicationDetailsComponent {
  @Input()
  reponseSurUnePublication!:ReponseSurUnePublication;

}
