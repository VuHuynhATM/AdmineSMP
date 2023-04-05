import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
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
    return this.httpClient.get(DOMAIN + `DataExchange?storeID=${storeIDtxt}&orderID=${orderIDtxt}&serviceID=${serviceIDtxt}&from=${dateFromtxt}&to=${dateTotxt}&exchangeStatusID=${exchangeStatustxt}&page=${page}`, { headers: this.headers })
  }
  finishStoreExchange(id: any, file: File):Observable<any>{
    var body =new FormData();
    body.append('ExchangeStoreID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `DataExchange`,body, { headers: this.headers })
  }

  getUserExchange(userID:number,orderID:number,serviceID:number,dateFrom:Date, dateTo:Date, exchangeStatus:number, page:number):Observable<any>{

    var userIDtxt='';
    if(userID!=undefined){
      userIDtxt=userID+'';
    }
    var dateFromtxt='';
    if(dateFrom!=undefined){
      dateFromtxt=(moment(dateFrom.toISOString())).format('MM-DD-YYYY')+'';
    }
    var dateTotxt='';
    if(dateTo!=undefined){
      dateTotxt=(moment(dateTo.toISOString())).format('MM-DD-YYYY')+'';
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
    return this.httpClient.get(DOMAIN + `DataExchange/user?userID=${userIDtxt}&orderID=${orderIDtxt}&serviceID=${serviceIDtxt}&from=${dateFromtxt}&to=${dateTotxt}&exchangeStatusID=${exchangeStatustxt}&page=${page}`, { headers: this.headers })
  }
  finishUserExchange(id: any, file: File):Observable<any>{
    var body =new FormData();
    body.append('ExchangeUserID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `DataExchange/user`,body, { headers: this.headers })
  }
}
