import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit{

  myForm!: FormGroup;
  publication: PublicationInitiale=new PublicationInitiale();

  constructor(private fb: FormBuilder,private crudService:CrudServiceService ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      titre: ['', Validators.required],
      sujet: ['', [Validators.required]]
    });



    }


  ajouter() {

    if (this.myForm.valid) {
      console.log("here")

      // @ts-ignore
      this.publication.titre=this.myForm.get('titre').value;
      // @ts-ignore
      this.publication.description=this.myForm.get('sujet').value;
      this.crudService.ajouter(this.publication,"/PublicationInitiale").subscribe(
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
}
