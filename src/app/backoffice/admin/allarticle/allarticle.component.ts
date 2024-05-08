import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/service/Article/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allarticle',
  templateUrl: './allarticle.component.html',
  styleUrls: ['./allarticle.component.css'],
})
export class AllarticleComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
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

  showArticleDetails(article: Article): void {
    if (article.id) {
      this.router.navigate(['/articledetails', article.id]);
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
