import {Component, Input} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {ActivatedRoute} from "@angular/router";
import {LikePublication} from "../../models/LikePublication";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";
import {SingalerPublicationComponent} from "../singaler-publication/singaler-publication.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.css']
})
export class DetailsPublicationComponent {

  post!:PublicationInitiale;
  publicationId!:number;
  likePost:LikePublication=new LikePublication();
  liked!: boolean
  buttonColor="white"

  likeDescription="like";

  constructor(private crudService:CrudServiceService,private dialog: MatDialog,private route: ActivatedRoute,private serviceUser:AuthServiceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicationId = params['id'];

    });
    this.afficherDetails(this.publicationId);


  }


  openPopup() {
    this.dialog.open(SingalerPublicationComponent, {
      data: { post: this.post }
    });  }

  afficherDetails(id:number){
    this.crudService.afficherDetails(id,"/PublicationInitiale/").subscribe(data=>{
      this.post=data
      for (let i in this.post.likePublicationList)
        if (this.post.likePublicationList[i].user.id == this.serviceUser.getCurrentUser().id){
          this.liked = true;
          this.buttonColor="red"
          this.likeDescription="liked"
        }
    })


  }

  like() {
    this.liked = false
    for (let i in this.post.likePublicationList) {
      if (this.post.likePublicationList[i].user.id == this.serviceUser.getCurrentUser().id) {
        this.liked = true;
        this.crudService.supprimer(this.post.likePublicationList[i].idLike,
          "/LikePublication/").subscribe(
          (data) => {

            window.location.reload();

          },
        );
        break;
      }
    }

    if (!this.liked) {
      this.likePost.publication = new PublicationInitiale();

      this.likePost.publication.idPublication = this.post.idPublication;
      this.likePost.user = this.serviceUser.getCurrentUser();
      console.log(this.likePost)
      this.crudService.ajouter(this.likePost, "/LikePublication").subscribe(
        (data) => {
          if (data != null) {
            console.log("succes")
            window.location.reload();


          } else console.log("fail");
        },
      );

    } else if (this.liked) {


    }

  }




}
