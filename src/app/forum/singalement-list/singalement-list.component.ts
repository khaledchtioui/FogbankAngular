import { Component } from '@angular/core';
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {SignalementPost} from "../../models/SignalementPost";

@Component({
  selector: 'app-singalement-list',
  templateUrl: './singalement-list.component.html',
  styleUrls: ['./singalement-list.component.css']
})
export class SingalementListComponent {
  constructor(private forumCrud:CrudServiceService) {

  }
  signalements: SignalementPost[] = [];



  ngOnInit():void {
    this.chargerTous();

  }


  chargerTous(){
    this.forumCrud.chargerTous("/Signalement").subscribe(data=>{
      this.signalements=data
    })


  }




}
