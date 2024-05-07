import {Component, Input, OnInit} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {LikePublication} from "../../models/LikePublication";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {MatDialog} from "@angular/material/dialog";
import {SingalerPublicationComponent} from "../singaler-publication/singaler-publication.component";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit{
  @Input() post!: PublicationInitiale;
  likePost:LikePublication=new LikePublication();
  liked!: boolean
  buttonColor="white"

  likeDescription="like";






  ngOnInit() {
    console.log(this.post)
    for (let i in this.post.likePublicationList)
      if (this.post.likePublicationList[i].user.id == this.userService.getCurrentUser().id){
        this.liked = true;
        this.buttonColor="red"
        this.likeDescription="liked"
      }
  }
constructor( private crudService :CrudServiceService,private userService: AuthServiceService,private dialog: MatDialog) {
}
  openPopup() {
    this.dialog.open(SingalerPublicationComponent, {
      data: { post: this.post }
    });  }




  like() {
    this.liked = false
    for (let i in this.post.likePublicationList) {
      if (this.post.likePublicationList[i].user.id == this.userService.getCurrentUser().id) {
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
      this.likePost.user = this.userService.getCurrentUser();
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
