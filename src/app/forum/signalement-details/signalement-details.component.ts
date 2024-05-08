import {Component, Input} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {LikePublication} from "../../models/LikePublication";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {MatDialog} from "@angular/material/dialog";
import {SingalerPublicationComponent} from "../singaler-publication/singaler-publication.component";
import {SignalementPost} from "../../models/SignalementPost";
import {SupprimerPublicationComponent} from "../supprimer-publication/supprimer-publication.component";
import {User} from "../../models/User";

@Component({
  selector: 'app-signalement-details',
  templateUrl: './signalement-details.component.html',
  styleUrls: ['./signalement-details.component.css']
})
export class SignalementDetailsComponent {
  @Input() signalementPost!: SignalementPost;

  signalement:SignalementPost=new SignalementPost()

post:PublicationInitiale=new PublicationInitiale()






  ngOnInit() {

  }
  constructor( private crudService :CrudServiceService,private userService: AuthServiceService,private dialog: MatDialog) {
  }
  openPopup() {
    this.dialog.open(SupprimerPublicationComponent, {
      data: { signalement: this.signalementPost }
    });  }


  marquerCommeTraite() {
    this.signalementPost.etat="traité"
    this.signalementPost.publication=new PublicationInitiale()

    this.signalementPost.publication.idPublication=this.signalementPost.publication.idPublication
    console.log(this.signalementPost)

    this.crudService.modifer(this.signalementPost,"/Signalement").subscribe(
      (data) => {
        if (data !=null)
        {
          console.log("succes")


        }
        else console.log("fail");
      },

    );

  }
}
