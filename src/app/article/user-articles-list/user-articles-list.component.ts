import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/service/Article/article.service';
import { AuthServiceService } from 'src/app/service/user/auth-service.service';

@Component({
  selector: 'app-user-articles-list',
  templateUrl: './user-articles-list.component.html',
  styleUrls: ['./user-articles-list.component.css'],
})
export class UserArticlesListComponent implements OnInit {
  articles: any[] = [];
  userId: any;
  currentUser: any;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userId = this.currentUser.id;

    this.loadArticles();
  }
  loadArticles(): void {
    this.articleService.getAllArticlesByUserId(this.userId).subscribe(
      (articles) => {
        console.log(articles);
        this.articles = articles;
      },
      (error) => {
        console.log(
          "Une erreur s'est produite lors du chargement des articles : ",
          error
        );
      }
    );
  }
}
