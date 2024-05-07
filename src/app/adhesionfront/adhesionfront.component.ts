import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators , AbstractControl, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Adhésion } from '../models/adhésion';
import { AdhésionService } from '../service/Adhésion/adhésion.service';
import { Club } from '../models/club';
import { ClubService } from '../service/Club/club.service';
import { AuthServiceService } from '../service/user/auth-service.service';

@Component({
  selector: 'app-adhesionfront',
  templateUrl: './adhesionfront.component.html',
  styleUrls: ['./adhesionfront.component.css']
})
export class AdhesionfrontComponent implements OnInit{
  adhesionForm!: FormGroup;
  club!: Club;
  clubId: string = '';

  adhesion: Adhésion = {
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
    club: undefined,
    user: undefined
  };

  constructor(private route: ActivatedRoute,private clubService: ClubService,private formBuilder: FormBuilder,private adhesionService:AdhésionService, private router: Router,private authService : AuthServiceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.clubId = id;
        this.getClubById();
      } 
      else {}
    });
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

  getClubById(): void {
    this.clubService.getClubById(this.clubId).subscribe(
      (club: Club) => {
        this.club = club;
        this.initForm();
      },
      (error) => {
        console.error('Error fetching club:', error);
      }
    );
  }
  


  addAdhesion() {
    
    if (this.adhesionForm.invalid) {
      return; 
    }
    this.adhesion = this.adhesionForm.value;
    this.adhesion.club = this.club;
    this.adhesion.user = this.authService.getCurrentUser();
    this.adhesion.status = 'PENDING';

    this.adhesionService.addAdhésion(this.adhesion).subscribe(
      (response) => {
        console.log('Club added successfully:', response);
        console.log(this.adhesion.club);
        console.log(this.adhesion.user);
        this.router.navigate(['/student/club']);
      },
      (error) => {
        console.error('Error adding club:', error);
      }
    );
  }
}
