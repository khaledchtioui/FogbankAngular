import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8087/Comment';

  constructor(private http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl);
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }

  deleteComment(idc: any) {
    return this.http.delete(`${this.baseUrl}/${idc}`);
  }

  addComment(data: any, id: any, userId: any): Observable<Comment> {
    console.log('data');
    console.log(data);
    return this.http.post<Comment>(`${this.baseUrl}/${id}/${userId}`, data);
  }

  updateComment(data: any): Observable<Comment> {
    console.log('data');
    console.log(data);
    return this.http.put<Comment>(this.baseUrl, data);
  }

  sentimentAnalysis(comment: any): Observable<Comment> {
    console.log(comment);
    return this.http.post<Comment>(
      `${this.baseUrl}/sentiment/analyse`,
      comment
    );
  }
}
