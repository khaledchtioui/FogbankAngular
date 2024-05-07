import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../user/token-storage.service";
import {Observable} from "rxjs";
import {baseUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {


  header: { headers: HttpHeaders };

  constructor(private tokenStorageService: TokenStorageService,private http:HttpClient) {

    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.tokenStorageService.getAccessToken()}`)
    };
  }

  ajouter(added:any,gestionApi:string):Observable<any>{
    return this.http.post<any>(`${baseUrl}`+gestionApi,added);
  }

  afficherDetails(id:number,gestionApi:string):Observable<any>{
   // return this.http.get<any>(`${baseUrl}`+gestionApi+id.toString(),this.header);

    return this.http.get<any>(`${baseUrl}`+gestionApi+id.toString());
  }

  modifer(modified:any,gestionApi:string):Observable<any>{
    return this.http.put<any>(`${baseUrl}`+gestionApi,modified)
  }

  chargerTous(gestionApi:string):Observable<any[]>{

    return this.http.get<any[]>(`${baseUrl}`+gestionApi)
  }

  supprimer(id:number,gestionApi:string):Observable<any>{
    // return this.http.get<any>(`${baseUrl}`+gestionApi+id.toString(),this.header);

    return this.http.delete<any>(`${baseUrl}`+gestionApi+id.toString());
  }


}
