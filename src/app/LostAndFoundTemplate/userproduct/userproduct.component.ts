import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../../models/Product";
import {Router} from "@angular/router";
import {ProductService} from "../../service/LostFoundServices/product.service";
import {LostProductService} from "../../service/LostFoundServices/lostproduct.service";
import {AuthServiceService} from "../../service/user/auth-service.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-userproduct',
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.css']
})
export class UserproductComponent  implements  OnInit{
  userId!: number;
  productSubscription: Subscription;
  products: Product[]=[];
  lostProducts: number[][] = [];
  title = 'app';
  elementType:any = 'url';
  value!:string ;
  showQRCode: boolean = false;
val:number=0;
  constructor(
    private productService: ProductService,
    private authService: AuthServiceService,
    private lostProductService: LostProductService,
    private router: Router


  ) {

    this.productSubscription = new Subscription();

  }

  ngOnInit(): void {
    this.userId=this.authService.getCurrentUser().id;
    this.fetchLostProducts();

    this.getProductById();



  }

  getProductById(): void {
    this.productSubscription = this.productService.getProductByIdu(this.userId)
      .subscribe(
        (data: Product[]) => {
          this.products = data;
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  deleteProduct(productId: number) {
    // Afficher une boîte de confirmation
    const confirmDelete = confirm("Voulez-vous vraiment supprimer ce produit ?");

    // Vérifier si l'utilisateur a confirmé la suppression
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log("Product deleted successfully.");
          window.location.reload();
          // Vous pouvez effectuer d'autres actions après la suppression si nécessaire
        },
        (error) => {
          console.error("Error deleting product:", error);
          // Gérer les erreurs si nécessaire
        }
      );
    }
  }

  fetchLostProducts(): void {
    this.lostProductService.getAllLostProducts().subscribe({
      next: (data: number[][]) => {
        this.lostProducts = data;
        console.log("data",this.lostProducts)
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits perdus :', error);
      }
    });
  }
  isProductLost(productId: number): boolean {
    // Vérifie si l'ID du produit est présent dans la liste des produits perdus
    return this.lostProducts.some(lp => lp[1] === productId);
  }
  openMap(productId: number): void {
    this.router.navigate(['/map', productId]);
  }
  isUser(): boolean {
    if (this.val == 0) {
      this.lostProducts.some(lp => {
        const lpValue = lp[2];

        this.authService.getUser(lpValue).subscribe(
          (user: User) => {
            console.log("Détails de l'utilisateur :", user);
            this.value = "nom: "+user.firstname + "\nprenom: "+user.lastname+"\nemail: "+user.email;
            this.val = 1;
            this.showQRCode = true; // Mettre à jour la variable showQRCode
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
            this.showQRCode = false; // Mettre à jour la variable showQRCode
          }
        );
      });
    }
    return this.showQRCode; // Retourner la valeur de showQRCode
  }



}
