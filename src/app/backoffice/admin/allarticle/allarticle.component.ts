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
  articles: Article[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
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
      this.router.navigate(['/admin/articledetails', article.id]);
    }
  }

  deleteUser(article: Article) {
    this.articleService.deleteUser(article.id).subscribe(() => {
      console.log('Utilisateur supprimé :', article);
      // Actualisez la liste des utilisateurs après la suppression
      this.ngOnInit();
    });
  }



  getArticlePhoto(id: string | undefined): string {
    const userPhotoUrl = this.articleService.getArticlePhotoUrl(id);

    // Check if userPhotoUrl is valid
    if (userPhotoUrl) {
      // Return userPhotoUrl if it's valid
      return userPhotoUrl;
    } else {
      // Return default image URL if userPhotoUrl is not valid or undefined
      return 'assets/img/instructor/profile-avatar.jpg';
    }
  }



}



