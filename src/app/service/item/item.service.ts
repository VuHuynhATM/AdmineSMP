import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  headers: any;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }
  getListItemSearch(search:string, min:number, max:number, rate:number, cateID:number, subCateID:number, brandID:number, brandModelID:number, sortBy:string, storeID:number, page:number ,itemStatusID:number): Observable<any> {
    var searchtxt="";
    if(search!=undefined){
      searchtxt=search;
    }
    var mintxt="";
    if(min!=undefined){
      mintxt=min+"";
    }
    var maxtxt="";
    if(max!=undefined){
      maxtxt=max+"";
    }
    var ratetxt="";
    if(rate!=undefined){
      ratetxt=rate+"";
    }
    var cateIDtxt="";
    if(cateID!=undefined){
      cateIDtxt=cateID+"";
    }
    var subCateIDtxt="";
    if(subCateID!=undefined){
      subCateIDtxt=subCateID+"";
    }
    var brandIDtxt="";
    if(brandID!=undefined){
      brandIDtxt=brandID+"";
    }
    var brandModelIDtxt="";
    if(brandModelID!=undefined){
      brandModelIDtxt=brandModelID+"";
    }
    var sortBytxt="";
    if(sortBy!=undefined){
      sortBytxt=sortBy+"";
    }
    var storeIDtxt="";
    if(storeID!=undefined){
      storeIDtxt=storeID+"";
    }
    var StatusIDtxt="";
    if(itemStatusID!=undefined){
      StatusIDtxt=itemStatusID+"";
    }
    console.log();
    return this.httpClient.get(DOMAIN + `Item/search_admin?search=${searchtxt}&min=${mintxt}&max=${maxtxt}&rate=${ratetxt}&cateID=${cateIDtxt}&subCateID=${subCateIDtxt}&brandID=${brandIDtxt}&brandModelID=${brandModelIDtxt}&sortBy=${sortBytxt}&storeID=${storeIDtxt}&page=${page}&isSupplier=${false}&itemStatusID=${StatusIDtxt}`, {headers: this.headers})
    .pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getItemDetail(id:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Item/item_detail?itemID=${id}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeItem(id:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Item/active_item?itemID=${id}`, null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeSubItem(id:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Item/active_subItem?subItemID=${id}`, null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockItem(id:number, statusText:string):Observable<any>{
    return this.httpClient.put(DOMAIN + `Item/block_item?itemID=${id}&statusText=${statusText}`, null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockSubItem(id:number, statusText:string):Observable<any>{
    return this.httpClient.put(DOMAIN + `Item/block_subItem?subItemID=${id}&statusText=${statusText}`, null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getlistFeedback(itemID:number,page:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Item/item_feedback?itemID=${itemID}&page=${page}&role=1`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
