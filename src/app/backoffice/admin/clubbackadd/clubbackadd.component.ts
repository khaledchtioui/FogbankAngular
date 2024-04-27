import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators , AbstractControl, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';

@Component({
  selector: 'app-clubbackadd',
  templateUrl: './clubbackadd.component.html',
  styleUrls: ['./clubbackadd.component.css']
})
export class ClubbackaddComponent implements OnInit{

  clubForm!: FormGroup;

  club: Club = {
    nom: '', // Initialize club properties as needed
    description: '',
    email: '',
    rs: '',
    cat: 'Select Category',
    Adhésions: [],
    users: []
  };

  categories: string[] = [
    'SPORTS',
    'ACADEMIC',
    'CULTURAL',
    'SOCIAL',
    'PROFESSIONAL',
    'SPECIAL_INTEREST',
    'OTHER'
  ];

  constructor(private formBuilder: FormBuilder,private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  
  initForm(): void {
    this.clubForm = this.formBuilder.group({
      nom: ['', [Validators.required,this.validateName]],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rs:  ['', Validators.required],
      cat: ['Select Category', Validators.required]
    });
  }
  

  
  validateName(control: AbstractControl): ValidationErrors | null {
    const namePattern: RegExp = /^[a-zA-Z\s]*$/; 
    if (!namePattern.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }
  



  addClub() {
    
    if (this.clubForm.invalid) {
      return; 
    }
    this.club = this.clubForm.value;

    this.clubService.addClub(this.club).subscribe(
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
