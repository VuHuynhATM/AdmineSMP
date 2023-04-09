import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
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
  getSystemInfo():Observable<any>{
    return this.httpClient.get(DOMAIN + `Asset`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getChart(year?:number):Observable<any>{
    var years: string = "";
    if (year != undefined) {
      years = year+"";
    }
    return this.httpClient.get(DOMAIN + `Asset/system_chart_reveneu?year=${years}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  editCommission_Precent(precent:any):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_commission_precent?commission_Precent=${precent}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  editAmount_Precent(amount:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_amount_active?amountActive=${amount}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  editRefund_Precent(precent:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_refund_precent?refund_Precent=${precent}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getStoreWithdrawal(storeID:number, page:number, statusID:number, from: Date, to: Date):Observable<any>{
    var storeIDtxt: string = "";
    if(storeID!=undefined){
      storeIDtxt=storeID+'';
    }
    var statusIDtxt="";
    if(statusID!=undefined){
      statusIDtxt=statusID+'';
    }
    var fromtxt="";
    if(from!=undefined){
      fromtxt=from.toISOString()+'';
    }
    var totxt="";
    if(to!=undefined){
      totxt=to.toISOString()+'';
    }
    return this.httpClient.get(DOMAIN + `Asset/get_store_withdrawal?storeID=${storeIDtxt}&page=${page}&statusID=${statusIDtxt}&from=${fromtxt}&to=${totxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  aceptwithdrawal(id:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/accept_store_withdrawal?storeWithdrawalID=${id}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  cancelwithdarawl(id:number, reason:string):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/cancel_store_withdrawal?storeWithdrawalID=${id}&reason=${reason}`,null, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  successwithdrawal(id: any, file: File):Observable<any>{
    var body =new FormData();
    body.append('Store_WithdrawalID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `Asset/success_store_withdrawal`,body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getStoreReveneu(storeID:number, page:number, orderID:number, from: Date, to: Date):Observable<any>{
    var storeIDtxt: string = "";
    if(storeID!=undefined){
      storeIDtxt=storeID+'';
    }
    var orderIDtxt="";
    if(orderID!=undefined){
      orderIDtxt=orderID+'';
    }
    var fromtxt="";
    if(from!=undefined){
      fromtxt=from+'';
    }
    var totxt="";
    if(to!=undefined){
      totxt=to+'';
    }
    return this.httpClient.get(DOMAIN + `Asset/get_store_reveneu?storeID=${storeIDtxt}&page=${page}&orderID=${orderIDtxt}&from=${fromtxt}&to=${totxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getSystemReveneu(page:number, from: Date, to: Date):Observable<any>{
    var fromtxt="";
    if(from!=undefined){
      fromtxt=from.toISOString()+'';
    }
    var totxt="";
    if(to!=undefined){
      totxt=to.toISOString()+'';
    }
    return this.httpClient.get(DOMAIN + `Asset/get_system_reveneu?page=${page}&from=${fromtxt}&to=${totxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getSystemStoreReveneu(page:number, from: Date, to: Date):Observable<any>{
    var fromtxt="";
    if(from!=undefined){
      fromtxt=from.toISOString()+'';
    }
    var totxt="";
    if(to!=undefined){
      totxt=to.toISOString()+'';
    }
    return this.httpClient.get(DOMAIN + `Asset/system_store_reveneu?page=${page}&from=${fromtxt}&to=${totxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getSystemWithdrawal(page:number, from: Date, to: Date):Observable<any>{
    var fromtxt="";
    if(from!=undefined){
      fromtxt=from.toISOString()+'';
    }
    var totxt="";
    if(to!=undefined){
      totxt=to.toISOString()+'';
    }
    return this.httpClient.get(DOMAIN + `Asset/get_system_withdrawal?page=${page}&from=${fromtxt}&to=${totxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  systemwithdrawal(amount: number,context:string, file: File):Observable<any>{
    var body =new FormData();
    body.append('Price',amount.toString());
    body.append('Context',context);
    body.append('File',file);
    return this.httpClient.post(DOMAIN + `Asset`,body, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
  getReport(page:number, reportType: number, storeID: number, userID:number):Observable<any>{
    var reportTypetxt="";
    if(reportType!=undefined){
      reportTypetxt=reportType+'';
    }
    var storeIDtxt="";
    if(storeID!=undefined){
      storeIDtxt=storeID+'';
    }
    var userIDtxt="";
    if(userID!=undefined){
      userIDtxt=userID+'';
    }
    return this.httpClient.get(DOMAIN + `Report/get_report?page=${page}&reportType=${reportTypetxt}&storeID=${storeIDtxt}&userID=${userIDtxt}`, { headers: this.headers }).pipe(
      catchError((err:HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
