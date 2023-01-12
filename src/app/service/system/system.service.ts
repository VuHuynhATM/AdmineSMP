import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  headers:any;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'authorization': 'Bearer '+JSON.parse(localStorage.getItem("USER") || "").token,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }
  getSystemInfo():Observable<any>{
    return this.httpClient.get(DOMAIN + `Asset`, { headers: this.headers })
  }
  getChart(year?:number):Observable<any>{
    var years: string = "";
    if (year != undefined) {
      years = year+"";
    }
    return this.httpClient.get(DOMAIN + `Asset/system_chart_reveneu?year=${years}`, { headers: this.headers })
  }
  editCommission_Precent(precent:any):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_commission_precent?commission_Precent=${precent}`,null, { headers: this.headers })
  }
  editAmount_Precent(amount:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_amount_active?amountActive=${amount}`,null, { headers: this.headers })
  }
  editRefund_Precent(precent:number):Observable<any>{
    return this.httpClient.put(DOMAIN + `Asset/update_refund_precent?refund_Precent=${precent}`,null, { headers: this.headers })
  }
}
