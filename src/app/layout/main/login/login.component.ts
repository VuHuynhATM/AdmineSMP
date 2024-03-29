import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DOMAIN } from 'src/app/utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userName!: any;
  password!: any;
  user!: any;
  firebasetoken!: any;
  checklogin:boolean=false;

  constructor(private messageService: MessageService,
    private auth: Auth,
    private router: Router,
    private httpclient: HttpClient
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('USER')!=undefined){
      this.router.navigate(['/home']);
    }
  }
  signIn(){
    this.checklogin=true;
    const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
    var check = reg.test(this.userName);
    if (!check) {
      this.checklogin=false;
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Nhập email' });
      return;
    }
    if (this.password == "") {
      this.checklogin=false;
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Nhập mật khẩu' });
      return;
    }
    signInWithEmailAndPassword(this.auth, this.userName, this.password).then((userCredential) => {
      this.auth.currentUser?.getIdToken().then((token) => {
        this.firebasetoken = token
        console.log(userCredential);
        const body = {
          email: this.userName,
          password: this.password,
          fcM_Firebase: localStorage.getItem("FCM"),
        }
        const header = new HttpHeaders({
          'authorization': 'Bearer ' + this.firebasetoken,
          'accept': '*/*',
          'Access-Control-Allow-Origin': '*'
        });
        console.log(this.firebasetoken);
        this.httpclient.post(DOMAIN + 'user/adminsign_in', body, { headers: header }).toPromise().then((result: any) => {
          if (result.success) {
            localStorage.setItem("USER", JSON.stringify(result.data));
            this.router.navigate(['/home']);
          } else {
            this.checklogin=false;
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập sai email hoặc mật khẩu" });
          }
        })
      })
    }).catch((error) => {
      this.checklogin=false;
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập sai email hoặc mật khẩu" });
    });
  }
}
