import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {SignalementPost} from "../../models/SignalementPost";

@Component({
  selector: 'app-singaler-publication',
  templateUrl: './singaler-publication.component.html',
  styleUrls: ['./singaler-publication.component.css']
})
export class SingalerPublicationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: any }
              ,private fb: FormBuilder,private crudService:CrudServiceService
              ,private userService: AuthServiceService) { }

  myForm!: FormGroup;

  singalement:SignalementPost=new SignalementPost()


  ngOnInit(): void {
    this.myForm = this.fb.group({
      commentaire: ['', Validators.required],
    });



  }


  ajouter() {

    if (this.myForm.valid) {
      console.log("here")

      // @ts-ignore
      this.singalement.commentaire=this.myForm.get('commentaire').value;
      // @ts-ignore
      this.singalement.user=this.userService.getCurrentUser()
      this.singalement.publication=this.data.post
      this.crudService.ajouter(this.singalement,"/Signalement").subscribe(
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
