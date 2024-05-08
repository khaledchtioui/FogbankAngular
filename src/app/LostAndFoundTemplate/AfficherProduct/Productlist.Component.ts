import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "../../service/LostFoundServices/product.service";
import {MapService} from "../../service/LostFoundServices/Map.service";
import {AuthServiceService} from "../../service/user/auth-service.service";

@Component({
  selector: 'app-articlelist',
  templateUrl: './Productlist.component.html',
  styleUrls: ['./Productlist.component.css']
})
export class ProductlistComponent implements OnInit {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProductCoordinates: any;

  searchQuery: string = ''; // Terme de recherche saisi par l'utilisateur


  constructor(private productService: ProductService,private authService : AuthServiceService,
              private http: HttpClient,
              private mapService: MapService,
              private router: Router
  ) {
    this.products = [];

   }
  currentUser: any;
  errorMessage: string | null = null;



  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        // Triez les produits par datepub dans l'ordre décroissant
        this.products = response.sort((a, b) => {
          const dateA = new Date(a.datepub); // Convertir la date de string à Date
          const dateB = new Date(b.datepub); // Convertir la date de string à Date
          return dateB.getTime() - dateA.getTime();
        });

        this.filteredProducts = this.products; // Initialisation de filteredProducts avec la liste complète des produits
        this.filterProducts(); // Appel de la méthode filterProducts()
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  findProduct(id: any) {
    this.currentUser = this.authService.getCurrentUser();

    const userId = this.currentUser.id;
    this.http.post<any>(`http://localhost:8087/api/lost-products/listeLostP/${id}/${userId}`, {}).subscribe(


      response => {

      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  filterProducts(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // Réinitialise les produits filtrés avec tous les produits si le champ de recherche est vide
    }
  }

  chargerMap(idP: any) {
    if (idP) {
      // Vérifier si le produit a des coordonnées
      this.mapService.getProductCoordinates(idP)
        .subscribe(coordinates => {
          if (coordinates && coordinates.longitude && coordinates.latitude) {
            const { longitude, latitude } = coordinates;
            console.log('Coordonnées du produit:', coordinates);
            this.router.navigate(['/map', longitude, latitude]);
          } else {
            console.error('Les coordonnées du produit sont manquantes ou incorrectes');
          }
        }, error => {
          console.error('Erreur lors de la récupération des coordonnées du produit:', error);
          this.errorMessage = 'Ce produit n\'a pas de carte associée.';

        });
    } else {
      console.warn('Aucun produit sélectionné.');
    }
  }
  }

