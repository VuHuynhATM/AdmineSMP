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
    if(localStorage.getItem("USER")!=undefined){
      this.headers = new HttpHeaders({
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER") || "").token,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      });
    }
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

  getlistSubCate_Specification(id:number): Observable<any>{
    return this.httpClient.get(DOMAIN + `Specification/sub_category?sub_CategoryID=${id}&role=1`, { headers: this.headers });
  }
  addSpecification(id:number, addspec:number[], removespec: number[]): Observable<any>{
    var body={
      sub_CategoryID:id,
      specificationIDsaAdd:addspec,
      specificationIDsRemove:removespec
    };
    return this.httpClient.post(DOMAIN + `Specification/add_specification`, body, { headers: this.headers });
  }
  addSpecificationSuggest(id:number, suggeatvalues: string): Observable<any>{
    var body={
      specificationID:id,
      suggsetvalues:suggeatvalues
    };
    console.log(body)

    return this.httpClient.post(DOMAIN + `Specification/add_specificationsuggset`, body, { headers: this.headers });

  }
}
