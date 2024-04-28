import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.css']
})
export class Navbar3Component implements OnInit{
  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService,private authService : AuthServiceService) {}
  logout(): void {
    console.log('Tokens cleared.');

    this.tokenStorageService.clearTokens();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User:', this.currentUser);
  }


}
