import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ActivatedRoute, Router } from '@angular/router';
import {MapService} from "../../service/LostFoundServices/Map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | null = null;
  private centroid: L.LatLngExpression = [36.8065, 10.1815]; // Coordonnées pour Tunis, Tunisie
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private productId: number; // Déclarer productId au niveau de la classe
  lon: number=0;
  lat: number=0;

  constructor(private mapService: MapService,private route: ActivatedRoute,private router: Router) { this.productId = 0; }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      const longitudeParam = params['longitude'];
      const latitudeParam = params['latitude'];

      if (longitudeParam && latitudeParam) {
        this.lon = +longitudeParam;
        this.lat = +latitudeParam;

        console.log('Longitude:', this.lon);
        console.log('Latitude:', this.lat);
        this.initMap();

        this.drawPoint(this.lon,this.lat);
        // Maintenant, vous pouvez initialiser la carte après avoir récupéré les paramètres de la route
      } else {
        console.error('Les paramètres de longitude et de latitude sont manquants.');
        this.initMap();

      }
    });




  }

  ngOnDestroy(): void {
    // Nettoyer la carte lors de la destruction du composant pour éviter les fuites de mémoire
    if (this.map) {
      this.map.remove();
    }
  }
  drawPoint(latitude: number, longitude: number): void {
    if (this.map) {
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      marker.bindPopup('Point').openPopup();
    }
  }
  private initMap(): void {
    try {
      if (!document.getElementById('map')) {
        throw new Error('Element with id "map" not found');
      }

      this.map = L.map('map', {
        center: this.centroid,
        zoom: 12
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);

      // Ajouter le calque des éléments dessinés à la carte
      this.drawnItems.addTo(this.map);

      // Configurer les options de dessin
      const drawOptions: L.Control.DrawConstructorOptions = {
        draw: {
          polyline: false,
          polygon: { allowIntersection: false },
          circle: {
            shapeOptions: {
              color: '#3388ff', // Couleur de la ligne
              fillColor: '#3388ff', // Couleur de remplissage
              fillOpacity: 0.5 // Opacité du remplissage
            }
          },
          rectangle: false,
          marker: false
        },
        edit: {
          featureGroup: this.drawnItems,
          remove: false
        }
      };

      // Ajouter le plugin de dessin à la carte
      new L.Control.Draw(drawOptions).addTo(this.map);

      // Gérer les événements de dessin
      this.map.on(L.Draw.Event.CREATED, (event: any) => {
        const layer: L.Layer = event.layer;
        this.drawnItems.addLayer(layer);

        // Récupérer les coordonnées de la zone dessinée
        const coordinates: L.LatLng[] = this.getCoordinates(layer);
        console.log('Zone dessinée:', coordinates);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  addMap(): void {
    if (this.drawnItems.getLayers().length === 0) {
      console.error('Aucune zone dessinée sur la carte.');
      return;
    }

    // Récupérer la première couche dessinée
    const layer: L.Layer = this.drawnItems.getLayers()[0];

    // Récupérer les coordonnées de la zone dessinée
    const coordinates: L.LatLng[] = this.getCoordinates(layer);

    // Remplacez productId par l'ID réel du produit

    // Récupérer les coordonnées de la première coordonnée de la zone dessinée
    const latitude: number = coordinates[0].lat;
    const longitude: number = coordinates[0].lng;

    // Appeler la méthode pour ajouter la carte au produit en utilisant le service MapService
    this.mapService.addMapToProduct(this.productId, latitude, longitude).subscribe(
      (response) => {
        console.log('Map added to product:', response);

        this.router.navigate(['/userproduct']);

        // Accéder aux coordonnées à partir de la réponse
        const addedMapCoordinates = {
          latitude: response.latitude,
          longitude: response.longitude
        };

        console.log('Added map coordinates:', addedMapCoordinates);
        // Traitez les coordonnées ajoutées ou effectuez d'autres actions si nécessaire
      },
      (error) => {
        console.error('Error adding map to product:', error);
        // Gérez l'erreur de manière appropriée
      }
    );
  }

  private getCoordinates(layer: L.Layer): L.LatLng[] {
    if (layer instanceof L.Polygon) {
      const bounds: L.LatLngBounds = layer.getBounds();
      return [
        bounds.getNorthWest(),
        bounds.getNorthEast(),
        bounds.getSouthEast(),
        bounds.getSouthWest(),
        bounds.getNorthWest()
      ];
    } else if (layer instanceof L.CircleMarker) {
      return [layer.getLatLng()];
    } else {
      throw new Error('Unsupported layer type');
    }
  }

}
