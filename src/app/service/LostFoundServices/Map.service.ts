import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Map } from '../../models/Map'; // Assurez-vous d'avoir défini votre modèle Map correspondant

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private baseUrl = 'http://localhost:8087/api/map'; // Assurez-vous que l'URL de base correspond à celle de votre backend

  constructor(private http: HttpClient) { }
  addMapToProduct(productId: number, latitude: number, longitude: number): Observable<Map> {
    const mapData = { latitude, longitude };
    return this.http.post<Map>(`${this.baseUrl}/products/${productId}/maps`, mapData);
  }
  getProductCoordinates(productId: number) {
    return this.http.get<any>(`http://localhost:8087/api/map/product/${productId}`);
  }
}
