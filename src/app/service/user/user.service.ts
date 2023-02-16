import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  getListCustomerSearch(value: string, page: number, roleID: number, isactive: boolean): Observable<any> {
    var search: string = "";
    var roleIDs: string = "";
    var isactives: string = "";
    if (value != undefined) {
      search = value;
    }
    if (roleID != undefined) {
      roleIDs = roleID + '';
    }
    if (isactive != undefined) {
      isactives = isactive + "";
    }
    return this.httpClient.get(DOMAIN + `user/get_users?page=${page}&search=${search}&roleID=${roleIDs}&isActive=${isactives}`, { headers: this.headers })
  }
  getUserDetail(userID: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `user/detail?userID=${userID}`, { headers: this.headers });
  }
  updateStatusUser(userID: number, isActive: boolean): Observable<any> {
    return this.httpClient.put(DOMAIN + `user/Update_user_status?userID=${userID}&isActive=${isActive}`, null, { headers: this.headers });
  }
  editUserName(name: string, id: number): Observable<any> {
    const body =
    {
      userID: id,
      userName: name,
    };
    return this.httpClient.put(DOMAIN + `user/edit_name`, body, { headers: this.headers });
  }
  editAvarta(file: File, id: number): Observable<any> {
    var body =new FormData();
    body.append('UserID',id.toString());
    body.append('File',file);
    return this.httpClient.put(DOMAIN + `user/edit_image`, body, { headers: this.headers });
  }
  editDoB(dob: Date, id: number): Observable<any> {
    var body =new FormData();
    body.append('UserID',id.toString());
    body.append('UserBirth',dob.toISOString());
    return this.httpClient.put(DOMAIN + `user/edit_birth`, body, { headers: this.headers });
  }
}
