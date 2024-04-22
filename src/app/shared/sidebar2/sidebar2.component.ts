import { Component } from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component {
  constructor(private tokenStorageService: TokenStorageService) {}
  logout(): void {
    console.log('Tokens cleared.');

    this.tokenStorageService.clearTokens();
  }

}
