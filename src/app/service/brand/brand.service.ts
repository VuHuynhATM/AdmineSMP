import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  headers: any;

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
  }
  getlistBrand(): Observable<any>{
    return this.httpClient.get(DOMAIN + `Brand`, { headers: this.headers });
  }
  getlistMotor(id:number): Observable<any>{
    return this.httpClient.get(DOMAIN + `Brand/brand_model?brandID=${id}`, { headers: this.headers });
  }
  activeBrand(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/active_brand?brandID=${id}`, null, { headers: this.headers });
  }
  blockBrand(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/remove_brand?brandID=${id}`, null, { headers: this.headers });
  }
  activeBrandModel(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/active_motorcycle?motorcycleID=${id}`, null, { headers: this.headers });
  }
  blockBrandModel(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/remove_motorcycle?motorcycleID=${id}`, null, { headers: this.headers });
  }
  createBrand(name:string): Observable<any>{
    return this.httpClient.post(DOMAIN + `Brand/create_brand?brand_Name=${name}`, null, { headers: this.headers });
  }
  createBrandModel(name:string, cateID:number): Observable<any>{
    return this.httpClient.post(DOMAIN + `Brand/create_motorcycle?moto_Name=${name}&brandID=${cateID}`, null, { headers: this.headers });
  }
}
