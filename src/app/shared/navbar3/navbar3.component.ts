import { Component } from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";

@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.css']
})
export class Navbar3Component {
  constructor(private tokenStorageService: TokenStorageService) {}
  logout(): void {
    console.log('Tokens cleared.');

    this.tokenStorageService.clearTokens();
  }


}
