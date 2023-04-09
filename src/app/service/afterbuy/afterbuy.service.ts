import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class AfterbuyService {

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

  getlistService(userID:number,storeID:number, dateFrom:Date, dateTo:Date, servicestatusID:number, page:number, orderID:number, serviceID:number, serviceType:number): Observable<any>{
    var userIDtxt='';
    if(userID!=undefined){
      userIDtxt=userID+'';
    }
    var storeIDtxt='';
    if(storeID!=undefined){
      storeIDtxt=storeID+'';
    }
    var dateFromtxt='';
    if(dateFrom!=undefined){
      dateFromtxt= dateFrom.toISOString()+'';
    }
    var dateTotxt='';
    if(dateTo!=undefined){
      dateTotxt= dateTo.toISOString()+'';
    }
    var servicestatusIDtxt='';
    if(servicestatusID!=undefined){
      servicestatusIDtxt=servicestatusID+'';
    }
    var orderIDtxt='';
    if(orderID!=undefined){
      orderIDtxt=orderID+'';
    }
    var serviceIDtxt='';
    if(serviceID!=undefined){
      serviceIDtxt=serviceID+'';
    }
    var serviceTypetxt='';
    if(serviceType!=undefined){
      serviceTypetxt=serviceType+'';
    }
    return this.httpClient.get(DOMAIN + `AfterBuyService?userID=${userIDtxt}&storeID=${storeIDtxt}&from=${dateFromtxt}&to=${dateTotxt}&servicestatusID=${servicestatusIDtxt}&page=${page}&orderID=${orderIDtxt}&serviceID=${serviceIDtxt}&serviceType=${serviceTypetxt}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getShipstatus(serviceID:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Ship/ship_status?serviceID=${serviceID}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  acceptervice(id:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `AfterBuyService/accepct?serviceID=${id}`,null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  canceltervice(id:number):Observable<any>{
    var body={
      serviceID: id,
      reason: "Quản trị viên hủy"
    }
    return this.httpClient.put(DOMAIN + `AfterBuyService/cancel`,body,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
