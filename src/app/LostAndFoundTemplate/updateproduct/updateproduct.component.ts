import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import ImageCompressor from "image-compressor.js";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ProductService} from "../../service/LostFoundServices/product.service";

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit{
  productId: number=0;
  errorMessageName: string | null = null;
  errorMessagePhone: string | null = null;
  errorMessageEmail: string | null = null;
  errorMessageDescription: string | null = null;
  errorMessageAddress: string | null = null;
  errorMessageType: string | null = null;
  formData: any = {}; // Initialisez formData avec un objet vide
  @ViewChild('productForm') productForm!: NgForm;
  constructor(private http: HttpClient,private route: ActivatedRoute,  private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('id'); // Récupérez l'ID du produit depuis l'URL

    if (productIdParam !== null) {
      this.getProductDetails(this.productId); // Utilisez l'ID pour récupérer
      this.productId = +productIdParam;
      this.getProductDetails(this.productId); // Utilisez l'ID pour récupérer les détails du produit
    } else {
      console.error('Product ID parameter is null');
    }
  }

  getProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.formData = product; // Initialisez formData avec les détails du produit récupérés
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onSubmit(): void {
    // Vérifiez si le formulaire est valide

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
    }else {
      // Si les données respectent les modèles spécifiés, appelez la méthode updateProduct de votre service
      this.productService.updateProduct(this.productId, this.formData).subscribe(
        (response) => {
          // Gérer la réponse de mise à jour
          console.log('Product updated successfully:', response);
          this.router.navigate(['/userproduct']);

        },
        (error) => {
          // Gérer les erreurs de mise à jour
          console.error('Error updating product:', error);
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
