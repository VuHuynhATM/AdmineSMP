import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

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
  getListStoreSearch(value: string, page: number, statusID: number): Observable<any> {
    var search: string = "";
    var statusIDs: string = "";
    if (value != undefined) {
      search = value;
    }
    if (statusID != undefined) {
      statusIDs = statusID + '';
    }
    return this.httpClient.get(DOMAIN + `Store?page=${page}&search=${search}&statusID=${statusIDs}`, { headers: this.headers })
  }
  getStoreDetail(storeID: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `Store/store_detail?storeID=${storeID}`, { headers: this.headers });
  }
  activeStore(storeID:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Store/active_store?storeID=${storeID}`,null, { headers: this.headers });
  }
  blockStore(storeID:number, statusText:string): Observable<any>{
    return this.httpClient.put(DOMAIN + `Store/block_store?storeID=${storeID}&statusText=${statusText}`,null, { headers: this.headers });
  }
}
