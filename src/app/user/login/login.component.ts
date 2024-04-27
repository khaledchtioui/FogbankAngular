import {Component} from "@angular/core";
import {SigninRequest} from "../../models/SigninRequest";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {TokenStorageService} from "../../service/user/token-storage.service";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {





  signinRequest: SigninRequest = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthServiceService , private tokenStorageService : TokenStorageService) { }

  signin() {
    this.authService.signin(this.signinRequest).subscribe(
      (response) => {
        console.log('Connexion réussie :', response);
        this.authService.handleAuthentication(response);
        console.log("test",this.tokenStorageService.getAccessToken() );

      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }

}
