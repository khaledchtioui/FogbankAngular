import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component  implements OnInit{

  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService , private authService: AuthServiceService) {}
  logout(): void {
    console.log('Tokens cleared.');

    this.tokenStorageService.clearTokens();
  }




  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User:', this.currentUser);
  }


}
