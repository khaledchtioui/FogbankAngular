import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {LostProduct} from "../../models/LostProduct";
@Injectable({
  providedIn: 'root'
})
export class LostProductService {
  private apiUrl = 'http://localhost:8087/api/lost-products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<LostProduct[]> {
    return this.http.get<LostProduct[]>(this.apiUrl);
  }

  getAllLostProducts(): Observable<number[][]> {
    return this.http.get<number[][]>('http://localhost:8087/api/lost-products/all');
  }



  getByProductId(id: any): Observable<LostProduct | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LostProduct>(url).pipe(
      catchError(() => of(null))
    );
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
