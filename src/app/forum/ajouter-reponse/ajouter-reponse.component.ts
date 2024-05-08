import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {ReponseSurUnePublication} from "../../models/ReponseSurUnePublication";
import {AuthServiceService} from "../../service/user/auth-service.service";



@Component({
  selector: 'app-ajouter-reponse',
  templateUrl: './ajouter-reponse.component.html',
  styleUrls: ['./ajouter-reponse.component.css']
})
export class AjouterReponseComponent implements OnInit{
  @Input()
  publicationInitiale!:PublicationInitiale;

  myForm!: FormGroup;
  reponseSurUnePublication: ReponseSurUnePublication=new ReponseSurUnePublication();

  constructor(private fb: FormBuilder,private crudService:CrudServiceService,private serviceUser:AuthServiceService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      sujet: ['', [Validators.required, Validators.minLength(5)]]
    });


  }


  ajouter() {

    if (this.myForm.valid) {
      console.log("here")


      // @ts-ignore
      this.reponseSurUnePublication.description=this.myForm.get('sujet').value;
      this.reponseSurUnePublication.publicationInitiale=new PublicationInitiale();

      this.reponseSurUnePublication.publicationInitiale.idPublication=this.publicationInitiale.idPublication;

      this.reponseSurUnePublication.user=this.serviceUser.getCurrentUser()




      console.log(JSON.stringify(this.reponseSurUnePublication))

      this.crudService.ajouter(this.reponseSurUnePublication,"/ReponsePublication").subscribe(
        (data) => {
          if (data !=null)
          {
            alert("reponse ajouté! ")
           window.location.reload();

          }
          else console.log("fail");
        },

      );
    }


  }
}
