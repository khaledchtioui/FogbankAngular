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

}
