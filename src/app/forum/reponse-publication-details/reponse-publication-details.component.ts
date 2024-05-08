import {Component, Input, OnInit} from '@angular/core';
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {LikePublication} from "../../models/LikePublication";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {MatDialog} from "@angular/material/dialog";
import {SingalerPublicationComponent} from "../singaler-publication/singaler-publication.component";

@Component({
  selector: 'app-reponse-publication-details',
  templateUrl: './reponse-publication-details.component.html',
  styleUrls: ['./reponse-publication-details.component.css']
})
export class ReponsePublicationDetailsComponent implements OnInit {
  @Input()
  reponseSurUnePublication!: ReponseSurUnePublication;
  likePost: LikePublication = new LikePublication();
  liked!: boolean
  buttonColor="white"
  likeDescription="like";

  currentUser: any;
  userPhotoUrl!: string;
  constructor(private crudService: CrudServiceService, private auth: AuthServiceService,private dialog: MatDialog) {

  }

  getUserPhoto(): void {
    this.auth.getUserPhoto(this.currentUser.id)
      .subscribe((photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userPhotoUrl = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      });
  }

  openPopup() {
    this.dialog.open(SingalerPublicationComponent, {
      data: { post: this.reponseSurUnePublication }
    });  }
  like() {
    this.liked = false
    for (let i in this.reponseSurUnePublication.likePublicationList) {
      if (this.reponseSurUnePublication.likePublicationList[i].user.id == this.auth.getCurrentUser().id) {
        this.liked = true;
        this.crudService.supprimer(this.reponseSurUnePublication.likePublicationList[i].idLike,
          "/LikePublication/").subscribe(
          (data) => {

            window.location.reload();

          },
        );
        break;
      }
    }

    if (!this.liked) {
      this.likePost.publication = new ReponseSurUnePublication();

      this.likePost.publication.idPublication = this.reponseSurUnePublication.idPublication;
      this.likePost.user = this.auth.getCurrentUser();
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

  ngOnInit(): void {
    for (let i in this.reponseSurUnePublication.likePublicationList)
      if (this.reponseSurUnePublication.likePublicationList[i].user.id == this.auth.getCurrentUser().id){
        this.liked = true;
        this.buttonColor="red"
        this.likeDescription="liked"
      }

  }
}
