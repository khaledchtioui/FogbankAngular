import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = 'http://localhost:8087/Articles';

  private baseUrl2 = 'http://localhost:8087/Likes';

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

  addArticle(data: any, userId: any): Observable<Article> {
    console.log('data');
    console.log(data);
    return this.http.post<Article>(`${this.baseUrl}/${userId}`, data);
  }

  uploadImage(id: any, file: File): Observable<Article> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);

    return this.http.post<Article>(
      `${this.baseUrl}/uploadImage/${id}`,
      formData
    );
  }

  updateArticle(data: any): Observable<Article> {
    console.log('data');
    console.log(data);
    return this.http.put<Article>(this.baseUrl, data);
  }

  shareFb(id: any): Observable<String> {
    console.log('data');
    return this.http.post<String>(`${this.baseUrl}/shareFb/${id}`, 'shared');
  }

  getAllArticlesByUserId(userId: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/user/${userId}`);
  }

  checkIfUserLike(userId: any, articleId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/${userId}/${articleId}`);
  }

  addLike(userId: any, articleId: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl2}/${userId}/${articleId}`,
      'liked'
    );
  }

  deleteLike(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl2}/${id}`);
  }
}
