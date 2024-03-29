import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class DataexchangeService {

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

  getStoreExchange(storeID:number,orderID:number,serviceID:number,dateFrom:Date, dateTo:Date, exchangeStatus:number, page:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var storeIDtxt='';
    if(storeID!=undefined){
      storeIDtxt=storeID+'';
    }
    var dateFromtxt='';
    if(dateFrom!=undefined){
      dateFromtxt=dateFrom.toISOString()+'';
    }
    var dateTotxt='';
    if(dateTo!=undefined){
      dateTotxt=dateTo.toISOString()+'';
    }
    var exchangeStatustxt='';
    if(exchangeStatus!=undefined){
      exchangeStatustxt=exchangeStatus+'';
    }
    var serviceIDtxt='';
    if(serviceID!=undefined){
      serviceIDtxt=serviceID+'';
    }
    var orderIDtxt='';
    if(orderID!=undefined){
      orderIDtxt=orderID+'';
    }
    return this.httpClient.get(DOMAIN + `DataExchange?storeID=${storeIDtxt}&orderID=${orderIDtxt}&serviceID=${serviceIDtxt}&from=${dateFromtxt}&to=${dateTotxt}&exchangeStatusID=${exchangeStatustxt}&page=${page}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  finishStoreExchange(id: any, file: File):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var body =new FormData();
    body.append('ExchangeStoreID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `DataExchange`,body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  getUserExchange(userID:number,orderID:number,serviceID:number,dateFrom:Date, dateTo:Date, exchangeStatus:number, page:number):Observable<any>{

    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var userIDtxt='';
    if(userID!=undefined){
      userIDtxt=userID+'';
    }
    var dateFromtxt='';
    if(dateFrom!=undefined){
      dateFromtxt=dateFrom.toISOString()+'';
    }
    var dateTotxt='';
    if(dateTo!=undefined){
      dateTotxt=dateTo.toISOString()+'';
    }
    var exchangeStatustxt='';
    if(exchangeStatus!=undefined){
      exchangeStatustxt=exchangeStatus+'';
    }
    var serviceIDtxt='';
    if(serviceID!=undefined){
      serviceIDtxt=serviceID+'';
    }
    var orderIDtxt='';
    if(orderID!=undefined){
      orderIDtxt=orderID+'';
    }
    return this.httpClient.get(DOMAIN + `DataExchange/user?userID=${userIDtxt}&orderID=${orderIDtxt}&serviceID=${serviceIDtxt}&from=${dateFromtxt}&to=${dateTotxt}&exchangeStatusID=${exchangeStatustxt}&page=${page}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  finishUserExchange(id: any, file: File):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    var body =new FormData();
    body.append('ExchangeUserID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `DataExchange/user`,body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  errorUserExchange(id: any):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `DataExchange/eror_usercard?DataExchangeID=${id}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
