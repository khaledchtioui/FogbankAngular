import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { AuthServiceService } from "../../service/user/auth-service.service";
import { User } from "../../models/User";
import { ArticleService } from "../../service/Article/article.service";
import { Article } from "../../models/Article";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  currentUser: User | null = null;
  idUser!: number;
  article!: Article;


  constructor(
    private articleService: ArticleService,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log("user: " + this.currentUser?.firstname + ' ' + this.currentUser?.lastname);
    this.idUser = this.currentUser?.id!;

    // Initialize the articleForm
    this.articleForm = this.formBuilder.group({
      titre: ['', Validators.required], // Add validation for titre field
      contenu: ['', Validators.required] // Add validation for contenu field
    });

    if (this.currentUser) {
      this.article = {
        titre: '',
        contenu: '',
        auteur: this.currentUser.lastname + ' ' + this.currentUser.firstname,
        date: new Date(),
        photo: undefined,
        user: this.currentUser.id
      };
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertFileToByteArray(file);
  }

  convertFileToByteArray(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer: ArrayBuffer | null = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      this.article.photo = uint8Array;
    };
    reader.readAsArrayBuffer(file);
  }

  onSubmit() {

    this.article.titre = this.articleForm.get('titre')?.value;
    this.article.contenu = this.articleForm.get('contenu')?.value;

    const formData = new FormData();
    formData.append('auteur', this.article.auteur);
    formData.append('titre', this.article.titre);
    formData.append('contenu', this.article.contenu);
    formData.append('date', new Date().toISOString());
    if (this.article.photo) {
      const blob = new Blob([this.article.photo], { type: 'application/octet-stream' });
      formData.append('photo', blob);
    }
      console.log(this.articleForm.value); // Log form values
      // Other form submission logic




    this.articleService.addArticleWithUser(formData, this.idUser).subscribe(
        response => {
          console.log(response);
          // Handle successful response here
        },
        error => {
          console.log("error: " + error);
          // Handle error response here
        }
      );

  }
}
