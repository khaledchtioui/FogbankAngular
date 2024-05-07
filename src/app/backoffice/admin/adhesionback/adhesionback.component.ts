import { Component ,OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ClubService } from 'src/app/service/Club/club.service';
import { Adhésion } from 'src/app/models/adhésion';
import { AdhésionService } from 'src/app/service/Adhésion/adhésion.service';
import { Club } from 'src/app/models/club';
import { AuthServiceService } from 'src/app/service/user/auth-service.service';




@Component({
  selector: 'app-adhesionback',
  templateUrl: './adhesionback.component.html',
  styleUrls: ['./adhesionback.component.css']
})
export class AdhesionbackComponent implements OnInit{
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
    users: []
  };

  adhesionn: Adhésion = {
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

  Decisions: string[] = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED',
    'EXPIRED'
  ];

  constructor(private authService : AuthServiceService,private route: ActivatedRoute,private router: Router,private adhesionService: AdhésionService,private clubService: ClubService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = params['id'];
      this.getClubById();
      this.getAdhesionsByClubId();
    });}

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

    getClubById(): void {
      this.clubService.getClubById(this.clubId).subscribe(
        (club: Club) => {
          this.club = club;
        },
        (error) => {
          console.error('Error fetching club:', error);
        }
      );
    }


    @ViewChild('statusUpdateModal') statusUpdateModal: any;
    updateAdd(adhesion:Adhésion): void {
      this.adhesionService.updateAdhésion(adhesion).subscribe(
        (updatedAdhesion: Adhésion) => {
            console.log('Adhesion updated successfully:', updatedAdhesion);
            this.statusUpdateModal.nativeElement.show();
        },
        (error) => {
            console.error('Error updating adhesion:', error);
        }
    );
    }
    
  


}
