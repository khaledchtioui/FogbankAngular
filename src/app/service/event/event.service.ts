import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8087/admin/events';

  constructor(private http: HttpClient) { }


  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  addEvent(event: any): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/createEvents`, event);
  }

  updateEvent(id: number, event: any): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/edit/${id}`, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }
}
