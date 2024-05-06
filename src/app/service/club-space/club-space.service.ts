import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubSpace } from 'src/app/models/ClubSpace';

@Injectable({
  providedIn: 'root'
})
export class ClubSpaceService {
  private baseUrl = 'http://localhost:8087/api/v1/admin';

  constructor(private http: HttpClient) { }

  addClubSpace(clubSpace: ClubSpace): Observable<ClubSpace> {
    return this.http.post<ClubSpace>(`${this.baseUrl}/addspace`, clubSpace);
  }

  deleteClubSpace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletespace/${id}`);
  }

  getClubSpaceById(id: number): Observable<ClubSpace> {
    return this.http.get<ClubSpace>(`${this.baseUrl}/space/${id}`);
  }
}
