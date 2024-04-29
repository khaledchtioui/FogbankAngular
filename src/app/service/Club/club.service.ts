import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../../models/club';


@Injectable({
  providedIn: 'root'
})

export class ClubService {
  private baseUrl = 'http://localhost:8087/api/v1/admin/retrieveAllClubs'; 
  private addUrl  = 'http://localhost:8087/api/v1/admin/addClub';
  private editUrl  = 'http://localhost:8087/api/v1/admin/retrieveClub';
  private upUrl  = 'http://localhost:8087/api/v1/admin/updateClub';
  private delUrl  = 'http://localhost:8087/api/v1/admin/deleteClub';

  constructor(private http: HttpClient) { }


  retrieveAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.baseUrl);
  }

  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(`${this.addUrl}`, club);
}
  getClubById(id: string): Observable<Club> {
  const url = `${this.editUrl}/${id}`;
  return this.http.get<Club>(url);
  }

  updateClub(club: Club): Observable<Club> {
    const url = `${this.upUrl}`;
    return this.http.put<Club>(url, club);
  }

  deleteClub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.delUrl}/${id}`);
  }
}
