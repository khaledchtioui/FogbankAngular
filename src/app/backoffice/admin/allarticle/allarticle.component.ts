import { Component } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/service/Article/article.service';

@Component({
  selector: 'app-allarticle',
  templateUrl: './allarticle.component.html',
  styleUrls: ['./allarticle.component.css']
})
export class AllarticleComponent {
  
  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      articles => {
        this.articles = articles;
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des articles : ', error);
      }
    );

}
}
