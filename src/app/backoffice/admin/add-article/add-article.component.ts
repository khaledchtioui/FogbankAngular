import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/service/Article/article.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/user/auth-service.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  imageFile: File | undefined;
  @ViewChild('fileInput') fileInput: any;
  imageUrl: string | ArrayBuffer | null = './assets/img/imageAdd.png';
  brandNewArticle: any;
  userId: any;
  currentUser: any;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.userId = this.currentUser.id;
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
      formData.value.image = 'specDefaultImg.png';
    }

    formData.date = new Date();
    formData.date = formData.date.toISOString().split('T')[0];
    console.log(formData.date);

    this.articleService.addArticle(formData, this.userId).subscribe({
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
                this.router.navigate(['/admin/allarticle']);
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
      },
    });
  }
}
