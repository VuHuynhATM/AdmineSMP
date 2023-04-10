import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

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
  getlistSpecification(): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Specification`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  
  blockSpecification(id:number): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Specification/remove_specification?specificationID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  activeSpecification(id:number): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Specification/active_specification?specificationID=${id}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  
  createSpecification(name:string): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.post(DOMAIN + `Specification?specification_Name=${name}`, null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  getlistSubCate_Specification(id:number): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Specification/sub_category?sub_CategoryID=${id}&role=1`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  addSpecification(id:number, addspec:number[], removespec: number[]): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var body={
      sub_CategoryID:id,
      specificationIDsaAdd:addspec,
      specificationIDsRemove:removespec
    };
    return this.httpClient.post(DOMAIN + `Specification/add_specification`, body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  addSpecificationSuggest(id:number, suggeatvalues: string): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var body={
      specificationID:id,
      suggsetvalues:suggeatvalues
    };
    console.log(body)

    return this.httpClient.post(DOMAIN + `Specification/add_specificationsuggset`, body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );

  }
}
