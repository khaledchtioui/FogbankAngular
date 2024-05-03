import { Component, OnInit } from '@angular/core';
import { Club } from '../models/club';
import { ClubService } from '../service/Club/club.service';
import { Router, NavigationExtras } from '@angular/router';
import { Adhésion } from '../models/adhésion';
import { AdhésionService } from '../service/Adhésion/adhésion.service';
import { AuthServiceService } from '../service/user/auth-service.service';

@Component({
  selector: 'app-clubfront',
  templateUrl: './clubfront.component.html',
  styleUrls: ['./clubfront.component.css']
})
export class ClubfrontComponent implements OnInit{
  clubs: Club[] = [];
  userAdhesions: Adhésion[] = [];
  constructor(private clubService: ClubService, private adhesionService: AdhésionService,private authService: AuthServiceService,private router: Router) { }
  
  ngOnInit(): void {
    this.retrieveClubs();
    this.retrieveUserAdhesions();
  }

  retrieveClubs(): void {
    this.clubService.retrieveAllClubs().subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
        console.log('clubs:', clubs);
      },
      (error) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

  retrieveUserAdhesions(): void {
    const userId = this.authService.getCurrentUser()?.id; 
    if (userId) {
      this.adhesionService.retrieveUserAdhesions(userId).subscribe(
        (adhesions: Adhésion[]) => {
          this.userAdhesions = adhesions;
          console.log('user adhesions:', adhesions);
        },
        (error) => {
          console.error('Error fetching user adhesions:', error);
        }
      );
    }
  }

  getAdhesionStatus(clubId: number): string {
    const adhesion = this.userAdhesions.find(adhesion => adhesion.club?.idclub === clubId);
    return adhesion ? adhesion.status : 'Unknown';
  }

  isMembershipApplied(clubId: number | undefined): boolean {
    // Check if clubId is defined
    if (clubId !== undefined) {
      return this.userAdhesions.some(adhesion => adhesion.club?.idclub === clubId);
    }
    return false; // Return false if clubId is undefined
  }

  getButtonColor(idclub: number | undefined): string {
    if (idclub !== undefined) {
        const status = this.getAdhesionStatus(idclub);
        switch (status) {
            case 'PENDING':
                return 'orange'; // Yellow background for PENDING status
            case 'APPROVED':
                return 'green'; // Green background for APPROVED status
            case 'REJECTED':
                return 'red'; // Red background for REJECTED status
            case 'EXPIRED':
                return 'purple'; // Purple background for EXPIRED status
            case 'CANCELLED':
                return 'blue'; // Blue background for CANCELLED status
            default:
                return ''; // No background color for other statuses
        }
    }
    return '';
}


  

}
