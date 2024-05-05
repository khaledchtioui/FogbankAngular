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
  private baseUrluser = 'http://localhost:8087/api/v1/user'; // Remplacez par l'URL de votre backend

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

  getCurrentUser(): any {
    const accessToken = this.tokenStorageService.getAccessToken();
    if (accessToken) {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload;
      }
    }
    return null;
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrluser}/getuser/${id}`);
    console.log("user: " + this.getUser);
  }


  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(`${this.baseUrluser}/updateUser`, user);
  }

  getUserPhoto(userId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrluser}/users/${userId}/photo`, { responseType: 'blob' });
  }
  getUserPhotoUrl(userId: number | undefined): string | null {
    if (!userId) {
      return null; // Return null if userId is not defined
    }
    return `${this.baseUrluser}/users/${userId}/photo`;
  }

  uploadUserPhoto(userId: number, photo: Uint8Array): Observable<any> {
    const formData = new FormData();
    const blob = new Blob([photo], { type: 'image/jpeg' }); // Adjust the image type as needed
    formData.append('photo', blob);
    return this.http.post(`${this.baseUrluser}/${userId}/photo`, formData);
  }

}
