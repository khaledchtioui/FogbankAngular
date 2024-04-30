import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublicationInitiale} from "../../models/PublicationInitiale";
import {CrudServiceService} from "../../service/forum/crud-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modifier-publication',
  templateUrl: './modifier-publication.component.html',
  styleUrls: ['./modifier-publication.component.css']
})
export class ModifierPublicationComponent {
 publicationInitiale!: PublicationInitiale;
  publicationId!:number;



  myFormP!: FormGroup;

  constructor(private fb: FormBuilder,private crudService:CrudServiceService,private route: ActivatedRoute ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.publicationId = params['id'];
    });


    this.crudService.afficherDetails(this.publicationId,"/PublicationInitiale/").subscribe(data=>{
      this.publicationInitiale=data
      console.log(this.publicationInitiale.titre)

      if (this.publicationInitiale) {
        this.myFormP = this.fb.group({
          Titre: [this.publicationInitiale.titre, Validators.required],
          sujet: [this.publicationInitiale.description, [Validators.required]]
        });
      }
    })





  }


  modifier() {

    if (this.myFormP.valid) {
      console.log("here")

      // @ts-ignore
      this.publication.titre=this.myFormP.get('Titre').value;
      // @ts-ignore
      this.publication.description=this.myFormP.get('sujet').value;
      this.crudService.modifer(this.publicationInitiale,"/PublicationInitiale").subscribe(
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
