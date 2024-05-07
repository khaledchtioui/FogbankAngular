
import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ImageCompressor from 'image-compressor.js';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './AjouterProduct.component.html',
  styleUrls: ['./AjouterProduct.component.css']
})
export class AjouterProductComponent  {
  products: any[] = []; // Tableau pour stocker les produits
  errorMessageName: string | null = null;
  errorMessagePhone: string | null = null;
  errorMessageEmail: string | null = null;
  errorMessageDescription: string | null = null;
  errorMessageAddress: string | null = null;
  errorMessageType: string | null = null;

  formData: any = {
    name: "",
    address: "",
    phone: "",
    email: "",
    type: "",
    description:"",
    picture:"",
  };


  constructor(private http: HttpClient,private authService : AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder

  ) {}

  currentUser: any;



  onSubmit() {
    const nameV = /^[A-Za-z]+$/;
    if (!this.formData.name || !nameV.test(this.formData.name)) {
      this.errorMessageName = 'Veuillez saisir un nom valide (caractères alphabétiques uniquement).';
      return;
    }else
    if (!this.formData.description || this.formData.description.length < 10) {
      this.errorMessageDescription = 'Veuillez saisir une description d\'au moins 10 caractères.';
      return;
    }else
    if (!this.formData.address || this.formData.address.length < 5) {
      this.errorMessageAddress = 'Veuillez saisir une adresse d\'au moins 5 caractères.';
      return;
    }else
      if (!this.formData.phone || !/^\d{8}$/.test(this.formData.phone)) {
      this.errorMessagePhone = 'Veuillez saisir un numéro de téléphone valide (8 chiffres)!).';
      return;
    }else
    if (!this.formData.email || !/^\S+@\S+\.\S+$/.test(this.formData.email)) {
      this.errorMessageEmail = 'Veuillez saisir une adresse e-mail valide.';
      return;
    }else
    if (!this.formData.type) {
      this.errorMessageType = 'Veuillez sélectionner un type.';
      return;
    }else

    {
      this.products.push({...this.formData});
      this.currentUser = this.authService.getCurrentUser();

      const userId = this.currentUser.id;

      this.http.post<any>(`http://localhost:8087/api/products/prodwu/${userId}`, this.products).subscribe(
        response => {
          console.log('Response from Spring:', this.formData);
          this.router.navigate(['/userproduct']);

        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }




  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      new ImageCompressor(file, {
        quality: 0.6, // Vous pouvez ajuster la qualité de compression ici
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => {
            const imageUrl: string = reader.result as string;
            console.log('Selected image URL:', imageUrl);
            this.formData.picture = imageUrl;
          };
        },
        error: (error) => {
          console.error('Error compressing image:', error);
        },
      });
    }
  }

}
