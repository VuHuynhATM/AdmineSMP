import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  headers: any;

  constructor(private httpClient: HttpClient) { 
    this.headers = new HttpHeaders({
      'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }
}
