import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
    return this.httpClient.get(DOMAIN + `Brand?role=1`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getlistMotor(id:number): Observable<any>{
    return this.httpClient.get(DOMAIN + `Brand/brand_model?brandID=${id}&role=1`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeBrand(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/active_brand?brandID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockBrand(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/remove_brand?brandID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeBrandModel(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/active_motorcycle?motorcycleID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockBrandModel(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Brand/remove_motorcycle?motorcycleID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  createBrand(name:string): Observable<any>{
    return this.httpClient.post(DOMAIN + `Brand/create_brand?brand_Name=${name}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  createBrandModel(name:string, cateID:number): Observable<any>{
    return this.httpClient.post(DOMAIN + `Brand/create_motorcycle?moto_Name=${name}&brandID=${cateID}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
