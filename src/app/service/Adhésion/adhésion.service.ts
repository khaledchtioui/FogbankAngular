import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../../models/club';
import { Adhésion } from 'src/app/models/adhésion';

@Injectable({
  providedIn: 'root'
})
export class AdhésionService {
  private baseUrl = 'http://localhost:8087/api/v1/admin/retrieveAllAdhésion';
  private addUrl  = 'http://localhost:8087/api/v1/admin/addAdhésion'; 

  constructor(private http: HttpClient) { }

  retrieveAllAdhésion(): Observable<Adhésion[]> {
    return this.http.get<Adhésion[]>(this.baseUrl);
  }

  addAdhésion(adhésion: Adhésion): Observable<Adhésion> {
    return this.http.post<Adhésion>(`${this.addUrl}`, adhésion);
}

}
