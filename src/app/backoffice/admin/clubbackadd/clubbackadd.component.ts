import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators , AbstractControl, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';
import ImageCompressor from 'image-compressor.js';
import { ClubSpace } from 'src/app/models/ClubSpace';


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
    image: '',
    Adhésions: [],
    users: [],
    clubSpace: undefined 
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
      image:  ['', Validators.required],
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
    const clubSpace: ClubSpace = {
      spaceid: 1, 
    };
    this.club.clubSpace = clubSpace;

    this.clubService.addClub(this.club).subscribe(
      (response) => {
        console.log('Club added successfully:', response);
        // Optionally, navigate to another page after adding the club
        this.router.navigate(['/admin/club']);
      },
      (error) => {
        console.error('Error adding club:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      new ImageCompressor(file, {
        quality: 0.6, // Vous pouvez ajuster la qualité de compression ici
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => {
            const imageUrl: string = reader.result as string;
            console.log('Selected image URL:', imageUrl);
            this.clubForm.patchValue({
              image: imageUrl // Set the image value in the form
            });
          };
        },
        error: (error) => {
          console.error('Error compressing image:', error);
        },
      });
    }
  }
  






}
