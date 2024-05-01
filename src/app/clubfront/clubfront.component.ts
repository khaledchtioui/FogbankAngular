import { Component, OnInit } from '@angular/core';
import { Club } from '../models/club';
import { ClubService } from '../service/Club/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubfront',
  templateUrl: './clubfront.component.html',
  styleUrls: ['./clubfront.component.css']
})
export class ClubfrontComponent implements OnInit{
  clubs: Club[] = [];
  constructor(private clubService: ClubService,private router: Router) { }
  
  ngOnInit(): void {
    this.retrieveClubs();
    
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

  navigateToAdhesionFront() {
    this.router.navigateByUrl('/student/club/apply');
  }

}
