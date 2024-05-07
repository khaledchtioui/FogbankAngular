import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/service/Article/article.service';
import { AuthServiceService } from 'src/app/service/user/auth-service.service';

@Component({
  selector: 'app-userallarticles',
  templateUrl: './userallarticles.component.html',
  styleUrls: ['./userallarticles.component.css'],
})
export class UserallarticlesComponent implements OnInit {
  articles: any[] = [];
  userId: any;
  currentUser: any;

  constructor(
    private articleService: ArticleService,
    private authService: AuthServiceService,
    private router: Router
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
        this.userId = this.currentUser.id;
      },
      (error) => {
        console.log(
          "Une erreur s'est produite lors du chargement des articles : ",
          error
        );
      }
    );
  }
  showArticleDetails(article: Article): void {
    if (article.id) {
      this.router.navigate(['/user/updatearticle', article.id]);
    }
  }

  deleteUser(article: Article) {
    this.articleService.deleteUser(article.id).subscribe(() => {
      console.log('Utilisateur supprimé :', article);
      // Actualisez la liste des utilisateurs après la suppression
      this.ngOnInit();
    });
  }
  shareFb(id: any): void {
    this.articleService.shareFb(id).subscribe(
      (res) => {
        //;
      }
      // handle errors...
    );
  }
}
