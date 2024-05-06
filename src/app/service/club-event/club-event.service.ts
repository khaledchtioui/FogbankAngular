import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubEvent } from 'src/app/models/ClubEvent';

@Injectable({
  providedIn: 'root'
})
export class ClubEventService {
  private baseUrl = 'http://localhost:8087/api/v1/admin';

  constructor(private http: HttpClient) { }

  addEvent(event: ClubEvent): Observable<ClubEvent> {
    return this.http.post<ClubEvent>(`${this.baseUrl}/addclubevent`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteclubevent/${id}`);
  }

  getAllEvents(): Observable<ClubEvent[]> {
    return this.http.get<ClubEvent[]>(`${this.baseUrl}/allclubevent`);
  }
}
