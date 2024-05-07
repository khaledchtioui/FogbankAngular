import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/service/Article/article.service';

@Component({
  selector: 'app-updatearticle',
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.css'],
})
export class UpdatearticleComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  imageFile: File | undefined;
  @ViewChild('fileInput') fileInput: any;
  imageUrl: string | ArrayBuffer | null = './assets/img/imageAdd.png';
  brandNewArticle: any;
  article: any;
  articleId: any;

  uploadUrl = 'http://localhost:8087/upload-directory';

  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.params['id'];

    this.articleService.getArticleById(this.articleId).subscribe({
      next: (res) => {
        this.article = res;
        this.imageUrl = `${this.uploadUrl}/${this.article.image}`;
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  submitForm(formData: any): void {
    console.log(formData);

    if (!this.imageFile) {
      formData.image = this.article.image;
      // console.log(formData.value.image);
    }

    formData.id = this.articleId;
    this.articleService.updateArticle(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.brandNewArticle = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        let imageUploadCompleted = new Subject();

        if (this.imageFile) {
          this.articleService
            .uploadImage(this.brandNewArticle.id, this.imageFile)
            .subscribe({
              next: (res) => {
                console.log('1_image upload********************');
                console.log(res);
              },
              error: (err) => {
                // console.log(err);
              },
              complete: () => {
                imageUploadCompleted.next(null);
                imageUploadCompleted.complete();
              },
            });
        } else {
          imageUploadCompleted.next(null);
          imageUploadCompleted.complete();
        }
        this.router.navigate(['/user/handlearticle']);
      },
    });
  }
}
