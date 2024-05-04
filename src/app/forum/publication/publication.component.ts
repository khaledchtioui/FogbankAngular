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





  ngOnInit() {
    console.log(this.post)
  }
constructor( private crudService :CrudServiceService,private userService: AuthServiceService,private dialog: MatDialog) {
}
  openPopup() {
    this.dialog.open(SingalerPublicationComponent, {
      data: { post: this.post }
    });  }
  like() {
    this.likePost.publication=this.post;
    this.likePost.user=this.userService.getCurrentUser()
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
