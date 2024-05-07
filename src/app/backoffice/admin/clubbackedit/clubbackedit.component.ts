import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Adhésion } from 'src/app/models/adhésion';
import { AdhésionService } from 'src/app/service/Adhésion/adhésion.service';
import ImageCompressor from 'image-compressor.js';
import { ClubEvent } from 'src/app/models/ClubEvent';
import { ClubEventService } from 'src/app/service/club-event/club-event.service';
import { ClubSpace } from 'src/app/models/ClubSpace';

@Component({
  selector: 'app-clubbackedit',
  templateUrl: './clubbackedit.component.html',
  styleUrls: ['./clubbackedit.component.css']
})

export class ClubbackeditComponent implements OnInit{
  clubForm!: FormGroup;
  clubeventForm!: FormGroup;
  adhesions: Adhésion[] = [];

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
    users: [],
    clubSpace: undefined 
  };

  clubEvent: ClubEvent = {
    id: 0,
    title: '',
    description: '',
    date: '',
    mc: '',
    img: '',
    comments: [],
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

  constructor(private clubEventService:ClubEventService,private route: ActivatedRoute,private router: Router,private adhesionService: AdhésionService,private clubService: ClubService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id !== null) {
      this.clubId = id;
      this.getClubById();
      this.getAdhesionsByClubId();
    } else {
      // Handle the case where the id is null, maybe redirect or show an error message
    }
  });
  this.initForm();
  this.initFormm();
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

initFormm(): void {
  this.clubeventForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    mc: ['', [Validators.required]],
    description: ['', [Validators.required]]
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
        this.initFormm();
        this.setFormValues();
      },
      (error) => {
        console.error('Error fetching club:', error);
      }
    );
  }

  getAdhesionsByClubId(): void {
    this.adhesionService.retrieveAllAdhésion().subscribe(
      (adhesions: Adhésion[]) => {
        // Filter adhesions to get only those belonging to the current club
        this.adhesions = adhesions.filter(adhesion => adhesion.club?.idclub === this.club.idclub);
        console.log('les adhesion ::',this.adhesions);
      },
      (error) => {
        console.error('Error fetching adhesions:', error);
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
        this.router.navigate(['/admin/club']);
      },
      (error) => {
        console.error('Error updating club:', error);
      }
    );
  }
  navigateToDeleteConfirmation(id: string): void {
    this.router.navigate(['/admin/club/delete', id]);
  }

  navigateToApplyConfirmation(id: string): void {
    this.router.navigate(['/admin/club/apply', id]);
  }



  

  addEvent() {
    if (this.clubeventForm.invalid) {
      return; 
    }
  
    this.clubEvent.title = this.clubeventForm.get('title')?.value ?? '';
    this.clubEvent.description = this.clubeventForm.get('description')?.value ?? '';
    this.clubEvent.date = this.clubeventForm.get('date')?.value ?? '';
    this.clubEvent.mc = this.clubeventForm.get('mc')?.value ?? '';
  
    // Check if clubSpace is null or not
    if (this.club.clubSpace) {
      // If clubSpace is not null, assign its spaceid to clubEvent
      this.clubEvent.clubSpace = this.club.clubSpace;
    } else {
      // If clubSpace is null, handle it according to your application's logic
      console.error('Error: clubSpace is null');
      // Optionally, you can set a default value or display an error message
      return;
    }
  
    this.clubEventService.addEvent(this.clubEvent).subscribe(
      (response) => {
        console.log('Club event added successfully:', response);
        console.log(this.clubEvent);
        // Optionally, navigate to another page after adding the club event
        this.router.navigate(['/admin/clubs']);
      },
      (error) => {
        console.error('Error adding club event:', error);
      }
    );
  }
  
  

}
