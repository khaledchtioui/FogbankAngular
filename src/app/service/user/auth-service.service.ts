import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../models/User";
import {SigninRequest} from "../../models/SigninRequest";
import {JwtAuthenticationResponse} from "../../models/JwtAuthenticationResponse";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8087/api/v1/auth'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  signup(signUpRequest: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, signUpRequest);
  }

  signin(signinRequest: SigninRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(`${this.baseUrl}/signin`, signinRequest);
  }


  handleAuthentication(response: JwtAuthenticationResponse): void {
    console.log(response.token);
    this.tokenStorageService.saveAccessToken(response.token);
    this.tokenStorageService.saveRefreshToken(response.refreshToken);
  }




}
