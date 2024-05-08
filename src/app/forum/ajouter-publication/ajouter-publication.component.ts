import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {ToastrService} from "ngx-toastr";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit{

  myForm!: FormGroup;
  publication: PublicationInitiale=new PublicationInitiale();

  constructor(private fb: FormBuilder,private crudService:CrudServiceService ,private userService: AuthServiceService,private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      sujet: ['', [Validators.required, Validators.minLength(20)]]
    });
  }



  ajouter() {

    if (this.myForm.valid) {
      console.log("here")

      // @ts-ignore
      this.publication.titre=this.myForm.get('titre').value;
      // @ts-ignore
      this.publication.description=this.myForm.get('sujet').value;
      this.publication.user=this.userService.getCurrentUser()
      console.log(this.publication)

      this.crudService.ajouter(this.publication,"/PublicationInitiale").subscribe(
        (data) => {
          if (data !=null)
          {
            alert("ajout avec succes")


          }
        },

      );
    }


  }
}
