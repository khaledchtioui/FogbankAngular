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
  adhesions: Adhésion[] = [];
  
  
  constructor(private clubService: ClubService, private adhesionService: AdhésionService,private authService: AuthServiceService,private router: Router) { }
  
  
  


  ngOnInit(): void {
    this.retrieveClubs();
    this.retrieveUserAdhesions();
    this.retrieveAdhesion();
  }

  retrieveAdhesion():void{
    this.adhesionService.retrieveAllAdhésion().subscribe(
      (adhesion: Adhésion[])=>{
        this.adhesions = adhesion;
        this.displayTopClubsOfMonth();
        console.log(adhesion);
      },
      (error) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

  displayTopClubsOfMonth(): void {
    // Filter adhesions for the current month
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript
    const adhesionsThisMonth = this.adhesions.filter(adhesion => {
      const adhesionDate = new Date(adhesion.dateAdhesion);
      return adhesionDate.getMonth() + 1 === currentMonth && !isNaN(adhesionDate.getTime()); // Check if date is valid
    });
  
    // Get the unique club IDs from adhesionsThisMonth
    const clubIdsThisMonth = Array.from(new Set(adhesionsThisMonth.map(adhesion => adhesion.club?.idclub)));
  
    // Filter clubs based on the club IDs with adhesions this month
    const clubsThisMonth = this.clubs.filter(club => clubIdsThisMonth.includes(club.idclub));
  
    // Calculate adhesion numbers for each club
    const clubAdhesionCounts: { [clubId: number]: number } = {};
    adhesionsThisMonth.forEach(adhesion => {
      const clubId = adhesion.club?.idclub !== undefined && adhesion.club?.idclub !== null ? adhesion.club.idclub : -1;
      if (clubId !== -1) {
        clubAdhesionCounts[clubId] = (clubAdhesionCounts[clubId] || 0) + 1;
      }
    });
  
    // Sort clubs based on adhesion numbers
    const sortedClubs = clubsThisMonth.slice().sort((a, b) => (clubAdhesionCounts[b.idclub !== undefined && b.idclub !== null ? b.idclub : -1] || 0) - (clubAdhesionCounts[a.idclub !== undefined && a.idclub !== null ? a.idclub : -1] || 0));
  
    // Display top 3 clubs
    this.clubs = sortedClubs.slice(0, 3);
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




  




  filledStarsArrays: { [key: number]: string[] } = {};
  emptyStarsArrays: { [key: number]: string[] } = {};
  rating: number = 0;
  numAdhesions: number = 0;
  clubId!: number;
  filledStars: number = 0;
  emptyStars: number = 0;
  
rateClub(clubId: number): void {
  if (clubId !== undefined) {
    this.clubId = clubId;
    // Get the click count for this club from localStorage
    const clickCountString = localStorage.getItem(`clickCount_${clubId}`);
    let clickCount = clickCountString ? +clickCountString : 0;

    // Increment the click count for this club
    clickCount++;
    
    // Update the click count for this club in localStorage
    localStorage.setItem(`clickCount_${clubId}`, clickCount.toString());

    console.log('Club ID:', clubId); // Log club ID to confirm it's not undefined
    this.adhesionService.retrieveAdhesionsByClubId(clubId).subscribe(
      (adhesions: Adhésion[]) => {
        const numAdhesions = adhesions.length;
        const rating = numAdhesions > 0 ? clickCount / numAdhesions : 0;
        const filledStars = Math.min(Math.floor(rating), 5);
        const emptyStars = Math.max(5 - filledStars, 0);
        this.filledStars = filledStars;
        this.emptyStars = emptyStars;
        this.filledStarsArrays [clubId]= Array(filledStars).fill('');
        this.emptyStarsArrays[clubId] = Array(emptyStars).fill('');
        console.log('Filled Stars:', this.filledStars);
        console.log('Empty Stars:', this.emptyStars);
        console.log('Rating:', rating); // Log the rating
      },
      (error) => {
        console.error('Error fetching adhesions:', error); // Log any errors
      }
    );
  } else {
    console.error('Club ID is undefined');
  }
}












resetRating(clubId: number | undefined): void {
  
    localStorage.removeItem(`clickCount_${clubId}`); // Remove the specific rating count
    console.log('Rating count for club', clubId, 'reset successfully.');
  
}











  

}
