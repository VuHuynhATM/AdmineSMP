import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      dateFromtxt=dateFrom.toISOString()+'';
    }
    var dateTotxt='';
    if(dateTo!=undefined){
      dateTotxt=dateTo.toISOString()+'';
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
    return this.httpClient.get(DOMAIN + `Order/get_order_status?userID=${userIDtxt}&storeID=${storeIDtxt}&dateFrom=${dateFromtxt}&dateTo=${dateTotxt}&shipOrderStatus=${shipOrderStatustxt}&userName=${userNametxt}&page=${page}&orderID=${orderIDtxt}`,{ headers: this.headers });
  }
  getTicket(orderID:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Ship/get_ticket?orderID=${orderID}`, { headers: this.headers });
  }
  cancelorder(orderID:number,reson:string):Observable<any>{
    return this.httpClient.put(DOMAIN + `Payment/cancel_order?orderID=${orderID}&reason=${reson}`, null,{ headers: this.headers });
  }
  getShipstatus(orderID:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Ship/ship_status?orderID=${orderID}`,{ headers: this.headers });
  }
  getFeedbackDetail(detailID:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Order/get_feedback_detail?orderDetailID=${detailID}`,{ headers: this.headers });
  }
}
