import {Component, Input} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.css']
})
export class DetailsPublicationComponent {

  post!:PublicationInitiale;
  publicationId!:number;

  constructor(private crudService:CrudServiceService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicationId = params['id'];
    });
    this.afficherDetails(this.publicationId);
  }

  afficherDetails(id:number){
    this.crudService.afficherDetails(id,"/PublicationInitiale/").subscribe(data=>{
      this.post=data
    })


  }





}
