import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {SignalementPost} from "../../models/SignalementPost";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";

@Component({
  selector: 'app-supprimer-publication',
  templateUrl: './supprimer-publication.component.html',
  styleUrls: ['./supprimer-publication.component.css']
})
export class SupprimerPublicationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { signalement: any }
    , private fb: FormBuilder, private crudService: CrudServiceService
    , private userService: AuthServiceService) {
  }




  ngOnInit(): void {



  }


  supprimer() {





    if (this.data.signalement.publication.hasOwnProperty('titre')) {
      this.crudService.supprimer(this.data.signalement.publication.idPublication,
        "/PublicationInitiale/").subscribe(
        (data) => {

          window.location.reload();


        },
      );
      console.log("publication supprimé")
    }

    else{

      this.crudService.supprimer(this.data.signalement.publication.idPublication,
        "/ReponsePublication/").subscribe(
        (data) => {

          window.location.reload();

        },
      );
      console.log("reponse supprimé")
    }

  }
}
