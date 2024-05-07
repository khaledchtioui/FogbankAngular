import { Component , OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ClubService } from '../../../service/Club/club.service';

@Component({
  selector: 'app-clubbackdelete',
  templateUrl: './clubbackdelete.component.html',
  styleUrls: ['./clubbackdelete.component.css']
})

export class ClubbackdeleteComponent implements OnInit{

  clubId: string = '';

  constructor(private route: ActivatedRoute, private clubService: ClubService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = params['id'];
    });
  }

  deleteClub(): void {
    this.clubService.deleteClub(this.clubId).subscribe(() => {
      // Club deleted successfully, navigate to another page
      this.router.navigate(['/admin/club']);
    }, error => {
      console.error('Error deleting club:', error);
    });
  }


}
