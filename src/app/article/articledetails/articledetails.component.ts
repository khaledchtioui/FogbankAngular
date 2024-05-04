import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../../service/Article/article.service";
import { Article } from "../../models/Article";

@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrls: ['./articledetails.component.css']
})
export class ArticledetailsComponent implements OnInit {

  article!: Article ;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticleDetails();
  }

  getArticleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');


    if (id) {
      this.articleService.getArticleById(id).subscribe(
        (article: Article) => {
          this.article = article;
          console.log("Article details:", this.article); // Move logging inside the callback
        },
        (error: any) => {
          console.error('Error fetching article details:', error);
          // Handle error if needed
        }
      );
    }


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
