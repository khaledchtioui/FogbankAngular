import {Component, Input, OnInit} from '@angular/core';
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {LikePublication} from "../../models/LikePublication";

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
constructor( private crudService :CrudServiceService) {
}

  like() {
    this.likePost.publication=this.post;
    console.log(this.likePost)
    this.crudService.ajouter(this.likePost,"/LikePublication").subscribe(
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
