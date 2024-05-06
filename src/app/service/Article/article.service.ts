import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private baseUrl = 'http://localhost:8087/Articles'; // URL de base pour votre API Spring

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl);
  }


}
