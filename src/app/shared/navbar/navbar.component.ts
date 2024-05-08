import { Component } from '@angular/core';
import {SingalerPublicationComponent} from "../../forum/singaler-publication/singaler-publication.component";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {MatDialog} from "@angular/material/dialog";
import {AjouterPublicationComponent} from "../../forum/ajouter-publication/ajouter-publication.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

    constructor( private dialog: MatDialog) {}


  openPopupPublication() {

      this.dialog.open(AjouterPublicationComponent, {

      });  }

}
