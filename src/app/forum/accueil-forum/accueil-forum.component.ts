import { Component } from '@angular/core';
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {PublicationInitiale} from "../../models/PublicationInitiale";

@Component({
  selector: 'app-accueil-forum',
  templateUrl: './accueil-forum.component.html',
  styleUrls: ['./accueil-forum.component.css']
})
export class AccueilForumComponent {

constructor(private forumCrud:CrudServiceService) {

}
  posts: PublicationInitiale[] = [];



  ngOnInit():void {
    this.chargerTous();

}


chargerTous(){
  this.forumCrud.chargerTous("/PublicationInitiale").subscribe(data=>{
    this.posts=data
  })


}





}
