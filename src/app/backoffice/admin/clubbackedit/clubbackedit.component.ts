import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';

@Component({
  selector: 'app-clubbackedit',
  templateUrl: './clubbackedit.component.html',
  styleUrls: ['./clubbackedit.component.css']
})

export class ClubbackeditComponent implements OnInit{
  clubForm!: FormGroup;

  clubId: string = '';
  club: Club = {
    idclub: 0,
    nom: '',
    description: '',
    email: '',
    rs: '',
    cat: '',
    image: '',
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

  constructor(private route: ActivatedRoute,private router: Router,private clubService: ClubService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id !== null) {
      this.clubId = id;
      this.getClubById();
      
    } else {
      // Handle the case where the id is null, maybe redirect or show an error message
    }
  });
  this.initForm();
}

initForm(): void {
  this.clubForm = this.formBuilder.group({
    nom: ['', [Validators.required,this.validateNamee]],
    description: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rs:  ['', Validators.required],
    cat: ['Select Category', Validators.required],
    image:  ['', Validators.required]
  });
}

validateNamee(control: AbstractControl): ValidationErrors | null {
  const namePattern: RegExp = /^[a-zA-Z\s]*$/; 
  if (!namePattern.test(control.value)) {
    return { invalidName: true };
  }
  return null;
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
setFormValues(): void {
  this.clubForm.patchValue({
    nom: this.club.nom,
    description: this.club.description,
    email: this.club.email,
    rs: this.club.rs,
    cat: this.club.cat,
    // You may need to set other form control values as well, like image
  });}



  getClubById(): void {
    this.clubService.getClubById(this.clubId).subscribe(
      (club: Club) => {
        this.club = club;
        this.initForm();
        this.setFormValues();
      },
      (error) => {
        console.error('Error fetching club:', error);
      }
    );
  }

  

  updateClub(): void {
    if (this.clubForm.invalid) {
      return; 
    }
    this.club.nom = this.clubForm.get('nom')?.value ?? '';
    this.club.description = this.clubForm.get('description')?.value ?? '';
    this.club.email = this.clubForm.get('email')?.value ?? '';
    this.club.rs = this.clubForm.get('rs')?.value ?? '';
    this.club.cat = this.clubForm.get('cat')?.value ?? '';
    this.club.image = this.clubForm.get('image')?.value ?? '';
    
    this.clubService.updateClub(this.club).subscribe(
      (updatedClub: Club) => {
        console.log('Club updated successfully:', updatedClub);
        // Optionally, navigate to another page after updating the club
        this.router.navigate(['/admin/clubs']);
      },
      (error) => {
        console.error('Error updating club:', error);
      }
    );
  }
  navigateToDeleteConfirmation(id: string): void {
    this.router.navigate(['/admin/club/delete', id]);
  }
  

}
