import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';




@Component({
  selector: 'app-clubback',
  templateUrl: './clubback.component.html',
  styleUrls: ['./clubback.component.css']
})

export class ClubbackComponent implements OnInit{
  clubs: Club[] = [];
  selectedCategory: string = 'All Clubs';
  originalClubs!: Club[];

  constructor(private clubService: ClubService,private router: Router) { }

  ngOnInit(): void {
    this.retrieveClubs();
    
  }


  navigateToAddClub() {
    this.router.navigate(['/admin/club/add']);
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

  filterClubsByCategory(): void {
    if (!this.originalClubs) {
      // Initialize originalClubs with the current clubs array
      this.originalClubs = [...this.clubs];
    }
    
    if (this.selectedCategory === 'All Clubs') {
      // If 'Choose' is selected, show all clubs from the original list
      this.clubs = [...this.originalClubs];
    } else {
      // Filter clubs based on selected category from the original list
      this.clubs = this.originalClubs.filter(club => club.cat === this.selectedCategory);
    }
  }

}
