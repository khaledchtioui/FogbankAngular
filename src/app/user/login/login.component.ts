import {Component} from "@angular/core";
import {SigninRequest} from "../../models/SigninRequest";
import {AuthServiceService} from "../../service/user/auth-service.service";

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

  constructor(private authService: AuthServiceService) { }

  signin() {
    this.authService.signin(this.signinRequest).subscribe(
      (response) => {
        console.log('Connexion réussie :', response);
        this.authService.handleAuthentication(response);
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
        // Gérer l'erreur ici
      }
    );
  }

}
