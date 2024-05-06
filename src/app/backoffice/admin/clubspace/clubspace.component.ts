import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/service/Club/club.service';

@Component({
  selector: 'app-clubspace',
  templateUrl: './clubspace.component.html',
  styleUrls: ['./clubspace.component.css']
})
export class ClubspaceComponent implements OnInit{
  clubId: string = '';
  clubSpaceId: string = '';
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

  constructor(private clubService: ClubService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clubId = params.get('clubId') || '';
      this.clubSpaceId = params.get('clubSpaceId') || '';
      this.getClubById();
      console.log(this.club);

      
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

  }


