import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../service/Article/article.service';
import { Article } from '../../models/Article';
import { CommentService } from 'src/app/service/Article/comment.service';
import { AuthServiceService } from 'src/app/service/user/auth-service.service';

@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrls: ['./articledetails.component.css'],
})
export class ArticledetailsComponent implements OnInit {
  article: any;
  articleId: any;
  comments: any;
  userId: any;
  @ViewChild('contenuField') contenuField: any;
  isEditing: boolean = false;
  comment: string = '';
  commentId: any;
  getComment: any;
  currentUser: any;
  like: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userId = this.currentUser.id;
    this.articleId = this.activatedRoute.snapshot.params['id'];

    this.getArticleDetails();

    this.checkuserLike();
  }

  checkuserLike(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.checkIfUserLike(this.userId, id).subscribe(
        (like: any) => {
          this.like = like;
          console.log(like);
        },
        (error: any) => {
          console.error('Error fetching likes details:', error);
        }
      );
    }
  }

  getArticleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(id).subscribe(
        (article: any) => {
          this.article = article;
          console.log(article);
        },
        (error: any) => {
          console.error('Error fetching article details:', error);
        }
      );
    }
  }

  submitForm(formData: any): void {
    console.log(formData);

    formData.datec = new Date();
    formData.datec = formData.datec.toISOString().split('T')[0];
    console.log('formData.datec');
    console.log(formData.datec);

    // formData.article_id = this.articleId;
    this.commentService
      .addComment(formData, this.articleId, this.userId)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.getArticleDetails();
          this.contenuField.reset();
        },
      });
  }

  //********************************** update comment **************/
  getCommentDetails(commentId: any) {
    console.log(commentId);
    this.commentService.getCommentById(commentId).subscribe(
      (comment) => {
        // Faites quelque chose avec les détails du commentaire récupéré
        console.log(comment);
        // this.contenuField.set(comment.comment);
        this.comment = comment.comment;
        this.commentId = comment.idc;
        this.getComment = comment;
      },
      (error) => {
        // Gérez l'erreur en conséquence
        console.log(error);
      }
    );
  }

  submitFormUpdate(formData: any): void {
    console.log(formData);

    formData.idc = this.commentId;

    console.log(formData);
    this.commentService.updateComment(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getArticleDetails();
        this.contenuField.reset();
        this.isEditing = !this.isEditing;
      },
    });
  }

  onDeleteComment(id: any): void {
    this.commentService.deleteComment(id).subscribe(() => {
      this.getArticleDetails();
    });
  }

  deleteLike(): void {
    this.articleService.deleteLike(this.like.id).subscribe(() => {
      this.getArticleDetails();
      this.checkuserLike();
    });
  }

  addLike(): void {
    this.articleService.addLike(this.userId, this.articleId).subscribe(() => {
      this.getArticleDetails();
      this.checkuserLike();
    });
  }
}
