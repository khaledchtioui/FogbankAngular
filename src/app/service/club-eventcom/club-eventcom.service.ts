import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubEventCom } from 'src/app/models/ClubEventCom';

@Injectable({
  providedIn: 'root'
})
export class ClubEventcomService {
  private baseUrl = 'http://localhost:8087/api/v1/admin';

  constructor(private http: HttpClient) { }

  addComment(comment: ClubEventCom): Observable<ClubEventCom> {
    return this.http.post<ClubEventCom>(`${this.baseUrl}/addclubeventcom`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteclubeventcom/${id}`);
  }

  getAllComments(): Observable<ClubEventCom[]> {
    return this.http.get<ClubEventCom[]>(`${this.baseUrl}/allclubeventcom`);
  }
}
