import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/token-storage.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component  implements OnInit{

  currentUser: any;
  userPhotoUrl!: string;
  idUser!:number;
  constructor(private router:Router, private tokenStorageService: TokenStorageService , private authService: AuthServiceService) {}





  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getUserPhoto();
    console.log('Current User:', this.currentUser);
  }


  public afficherProfile() {
    this.idUser = this.authService.getCurrentUser().id;
    this.router.navigate(['/admin/edit'], { queryParams: { id: this.idUser }});
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }


  public logOut(): void {
    console.log('logout');
    this.tokenStorageService.clearTokens();
    this.router.navigateByUrl('/login');
  }

  getUserPhoto(): void {
    this.authService.getUserPhoto(this.currentUser.id)
      .subscribe((photoBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userPhotoUrl = reader.result as string;
        };
        reader.readAsDataURL(photoBlob);
      });
  }



  }
