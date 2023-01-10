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
}
