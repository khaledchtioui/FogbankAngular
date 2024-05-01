import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators , AbstractControl, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Adhésion } from '../models/adhésion';
import { AdhésionService } from '../service/Adhésion/adhésion.service';

@Component({
  selector: 'app-adhesionfront',
  templateUrl: './adhesionfront.component.html',
  styleUrls: ['./adhesionfront.component.css']
})
export class AdhesionfrontComponent implements OnInit{
  adhesionForm!: FormGroup;

  adhesion: Adhésion = {
    //dateAdhesion: null, // Initialize club properties as needed
    status: 'PENDING',
    questionOne: '',
    questionTwo: '',
    questionThree: '',
    questionFour: '',
    questionFive: '',
    questionSix: '',
    questionSeven: '',
    questionEight: '',
    questionNine: '',
    IDAdhesion: 0,
    dateAdhesion: new Date(2024, 3, 25),
    club: undefined
  };

  constructor(private formBuilder: FormBuilder,private adhesionService:AdhésionService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  
  initForm(): void {
    this.adhesionForm = this.formBuilder.group({
      questionOne: ['', [Validators.required]],
      questionTwo: ['', [Validators.required]],
      questionThree: ['', [Validators.required]],
      questionFour: ['', [Validators.required]],
      questionFive: ['', [Validators.required]],
      questionSix: ['', [Validators.required]],
      questionSeven: ['', [Validators.required]],
      questionEight: ['', [Validators.required]],
      questionNine: ['', [Validators.required]]
    });
  }


  addAdhesion() {
    
    if (this.adhesionForm.invalid) {
      return; 
    }
    this.adhesion = this.adhesionForm.value;

    this.adhesionService.addAdhésion(this.adhesion).subscribe(
      (response) => {
        console.log('Club added successfully:', response);
        // Optionally, navigate to another page after adding the club
        this.router.navigate(['/admin/clubs']);
      },
      (error) => {
        console.error('Error adding club:', error);
      }
    );
  }

}
