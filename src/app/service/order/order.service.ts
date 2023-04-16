import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  getlistOrder(userID:number,storeID:number, dateFrom:Date, dateTo:Date, shipOrderStatus:number, page:number, userName:string, orderID:number): Observable<any>{
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
    var shipOrderStatustxt='';
    if(shipOrderStatus!=undefined){
      shipOrderStatustxt=shipOrderStatus+'';
    }
    var userNametxt='';
    if(userName!=undefined){
      userNametxt=userName;
    }
    var orderIDtxt='';
    if(orderID!=undefined){
      orderIDtxt=orderID+'';
    }
    console.log(userIDtxt);
    return this.httpClient.get(DOMAIN + `Order/get_order_status?userID=${userIDtxt}&storeID=${storeIDtxt}&dateFrom=${dateFromtxt}&dateTo=${dateTotxt}&shipOrderStatus=${shipOrderStatustxt}&userName=${userNametxt}&page=${page}&orderID=${orderIDtxt}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getTicket(orderID:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Ship/get_ticket?orderID=${orderID}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  cancelorder(orderID:number,reson:string):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Payment/cancel_order?orderID=${orderID}&reason=${reson}`, null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getShipstatus(orderID:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Ship/ship_status?orderID=${orderID}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getFeedbackDetail(detailID:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.get(DOMAIN + `Order/get_feedback_detail?orderDetailID=${detailID}`,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  blockFeedback(detailID:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Order/block_feedback?orderDetailID=${detailID}`,null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  activeFeedback(detailID:number):Observable<any>{
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
    return this.httpClient.put(DOMAIN + `Order/active_feedback?orderDetailID=${detailID}`,null,{ headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
