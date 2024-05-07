import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Article } from 'src/app/models/Article';
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = 'http://localhost:8087/Articles';

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`);
  }

  deleteUser(articleId: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${articleId}`);
  }


  getArticlePhotoUrl(articleId: string | undefined): string | null {
    if (!articleId) {
      return null; // Return null if userId is not defined
    }
    return `${this.baseUrl}/article/${articleId}/photo`;
  }










  addArticleWithUser(formData: FormData, userId: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.baseUrl}/addArticleWithUser/${userId}`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }










}
