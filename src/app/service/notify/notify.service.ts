import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/utils/AppConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

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
  getNotifications(userID:number, page:number):Observable<any>{
    return this.httpClient.get(DOMAIN + `Notification?userID=${userID}&page=${page}`, { headers: this.headers })
  }
}
