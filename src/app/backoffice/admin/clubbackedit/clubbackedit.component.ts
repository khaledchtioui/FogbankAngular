import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';

@Component({
  selector: 'app-clubbackedit',
  templateUrl: './clubbackedit.component.html',
  styleUrls: ['./clubbackedit.component.css']
})

export class ClubbackeditComponent implements OnInit{
  clubId: string = '';
  club: Club = {
    idclub: 0,
    description: '',
    email: '',
    nom: '',
    rs: '',
    cat: '',
    Adhésions: [],
    users: []
  };

  constructor(private route: ActivatedRoute,private router: Router,private clubService: ClubService) {}

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

  updateClub(): void {
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
