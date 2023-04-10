import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  headers:any;

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
  }
  getListStoreSearch(value: string, page: number, statusID: number): Observable<any> {
    var search: string = "";
    var statusIDs: string = "";
    if (value != undefined) {
      search = value;
    }
    if (statusID != undefined) {
      statusIDs = statusID + '';
    }
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    console.log(this.headers);
    return this.httpClient.get(DOMAIN + `Store?page=${page}&search=${search}&statusID=${statusIDs}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getStoreDetail(storeID: number): Observable<any> {
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Store/store_detail?storeID=${storeID}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeStore(storeID:number): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Store/active_store?storeID=${storeID}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockStore(storeID:number, statusText:string): Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Store/block_store?storeID=${storeID}&statusText=${statusText}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
