import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

  headers: any;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }
  getlistSpecification(): Observable<any>{
    return this.httpClient.get(DOMAIN + `Specification`, { headers: this.headers });
  }
  
  blockSpecification(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Specification/remove_specification?specificationID=${id}`, null, { headers: this.headers });
  }

  activeSpecification(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Specification/active_specification?specificationID=${id}`, null, { headers: this.headers });
  }
  
  createSpecification(name:string): Observable<any>{
    return this.httpClient.post(DOMAIN + `Specification?specification_Name=${name}`, null, { headers: this.headers });
  }
}
