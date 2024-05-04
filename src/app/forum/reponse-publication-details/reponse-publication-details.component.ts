import {Component, Input} from '@angular/core';
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {LikePublication} from "../../models/LikePublication";

@Component({
  selector: 'app-reponse-publication-details',
  templateUrl: './reponse-publication-details.component.html',
  styleUrls: ['./reponse-publication-details.component.css']
})
export class ReponsePublicationDetailsComponent {
  @Input()
  reponseSurUnePublication!:ReponseSurUnePublication;

  likePost:LikePublication=new LikePublication();


  constructor(private crudService :CrudServiceService) {
  }

  like() {
    this.likePost.publication=this.reponseSurUnePublication;
    console.log(this.likePost)
    this.crudService.ajouter(this.likePost,"/LikePublication").subscribe(
      (data) => {
        if (data !=null)
        {
          console.log("succes")
          window.location.reload();


        }
        else console.log("fail");
      },

    );

  }

}
