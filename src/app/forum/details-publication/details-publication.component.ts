import {Component, Input} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {ActivatedRoute} from "@angular/router";
import {LikePublication} from "../../models/LikePublication";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.css']
})
export class DetailsPublicationComponent {

  post!:PublicationInitiale;
  publicationId!:number;
  likePost:LikePublication=new LikePublication();


  constructor(private crudService:CrudServiceService,private route: ActivatedRoute,private serviceUser:AuthServiceService) {
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
  like() {
    this.likePost.publication=this.post;
    this.likePost.user=this.serviceUser.getCurrentUser()
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
