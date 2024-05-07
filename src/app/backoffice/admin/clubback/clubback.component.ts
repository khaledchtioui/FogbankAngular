import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from '../../../service/Club/club.service';
import { Adhésion } from 'src/app/models/adhésion';
import { AdhésionService } from 'src/app/service/Adhésion/adhésion.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);




@Component({
  selector: 'app-clubback',
  templateUrl: './clubback.component.html',
  styleUrls: ['./clubback.component.css']
})

export class ClubbackComponent implements OnInit{
  clubs: Club[] = [];
  adhesion: Adhésion[]=[];
  selectedCategory: string = 'All Clubs';
  originalClubs!: Club[];
  searchQuery: string = '';

  

  constructor(private clubService: ClubService,private router: Router,private adhesionservice: AdhésionService) { }

  ngOnInit(): void {
    this.retrieveClubs();
    this.retrieveAdhesion();
    
  }


  navigateToAddClub() {
    this.router.navigate(['/admin/club/add']);
  }

  

  retrieveClubs(): void {
    this.clubService.retrieveAllClubs().subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
        console.log('clubs:', clubs);
        this.generateChart();
        this.generatePieChart();
      },
      (error) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

  retrieveAdhesion():void{
    this.adhesionservice.retrieveAllAdhésion().subscribe(
      (adhesion: Adhésion[])=>{
        this.adhesion = adhesion;
        console.log(adhesion);
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


  filterClubsBySearch(): void {
    if (!this.originalClubs) {
      // Initialize originalClubs with the current clubs array
      this.originalClubs = [...this.clubs];
    }
    
    if (this.searchQuery.trim() === '') {
      // If search query is empty, show all clubs from the original list
      this.clubs = [...this.originalClubs];
    } else {
      // Filter clubs based on search query from the original list
      this.clubs = this.originalClubs.filter(club => club.nom.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }





  generateChart(): void {
    setTimeout(() => { // Add a delay before rendering the chart
      const clubAdhesionCounts: { [clubId: number]: number } = {};
      // Count adhesions for each club
      this.adhesion.forEach(adhesion => {
        const clubId = adhesion.club?.idclub;
        if (clubId) {
          clubAdhesionCounts[clubId] = (clubAdhesionCounts[clubId] || 0) + 1;
        }
      });
      // Prepare data for the chart
      const clubIds = Object.keys(clubAdhesionCounts);
      const adhesionCounts = clubIds.map(clubId => clubAdhesionCounts[parseInt(clubId)]);
      const clubNames = clubIds.map(clubId => this.clubs.find(club => club.idclub === parseInt(clubId))?.nom || '');
      console.log('Club Names:', clubNames);
      console.log('Adhesion Counts:', adhesionCounts);
      // Create the chart
      const ctx = document.getElementById('adhesionChart') as HTMLCanvasElement;
      const adhesionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: clubNames,
          datasets: [{
            label: 'Number of Adhesions',
            data: adhesionCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, 500); // 500 milliseconds delay
  }


  generatePieChart(): void {
    setTimeout(() => {
      const adhesionStatusCounts: { [status: string]: number } = {};
  
      // Count adhesions for each status
      this.adhesion.forEach(adhesion => {
        const status = adhesion.status;
        adhesionStatusCounts[status] = (adhesionStatusCounts[status] || 0) + 1;
      });
  
      // Prepare data for the chart
      const statuses = Object.keys(adhesionStatusCounts);
      const statusCounts = statuses.map(status => adhesionStatusCounts[status]);
  
      // Create the chart
      const ctx = document.getElementById('adhesionStatusChart') as HTMLCanvasElement;
      const adhesionStatusChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: statuses,
          datasets: [{
            label: 'Number of Adhesions',
            data: statusCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }, 500); // Adjust delay as needed
  }





  

}
