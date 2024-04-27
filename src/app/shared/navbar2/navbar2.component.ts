import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit{
  currentUser: any;
  constructor(private authService : AuthServiceService) {}


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User:', this.currentUser);
  }



}
