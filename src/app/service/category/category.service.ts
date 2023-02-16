import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/utils/AppConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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
  getlistCategory(): Observable<any>{
    return this.httpClient.get(DOMAIN + `Category`, { headers: this.headers });
  }
  getlistSubCategory(id:number): Observable<any>{
    return this.httpClient.get(DOMAIN + `Category/sub_category?categoryID=${id}`, { headers: this.headers });
  }
  activeCategory(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Category/active_category?categoryID=${id}`, null, { headers: this.headers });
  }
  blockCategory(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Category/remove_category?categoryID=${id}`, null, { headers: this.headers });
  }
  activeSubCategory(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Category/active_subcategory?subCategoryID=${id}`, null, { headers: this.headers });
  }
  blockSubCategory(id:number): Observable<any>{
    return this.httpClient.put(DOMAIN + `Category/remove_subcategory?subCategoryID=${id}`, null, { headers: this.headers });
  }
  createCategory(name:string): Observable<any>{
    return this.httpClient.post(DOMAIN + `Category/create_category?category_Name=${name}`, null, { headers: this.headers });
  }
  createSubCategory(name:string, cateID:number): Observable<any>{
    return this.httpClient.post(DOMAIN + `Category/create_subcategory?category_Name=${name}&categoryID=${cateID}`, null, { headers: this.headers });
  }
}
