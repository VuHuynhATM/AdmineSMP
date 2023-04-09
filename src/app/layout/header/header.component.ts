import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { NotifyService } from 'src/app/service/notify/notify.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService, DialogService]
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  user!: any;
  notilist!:any;
  check:boolean=false;
  message: any = null;
  page:any=1;
  totalPage!: number;

  constructor(private notifyService:NotifyService,
    private storeService: SupplierService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.notilist=[]
    this.user = localStorage.getItem("USER")
    if (this.user == undefined) {
      this.items = [
        {
          label: 'Đăng nhập',
          icon: 'pi pi-fw pi-sign-in',
          routerLink: '/login'
        },
      ];
    } else {
      this.getNotification();
      this.check=true;
      this.items = [
        {
          label: 'Tài khoản',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Trang cá nhân',
              icon: 'pi pi-user-edit',
              routerLink: '/yourprofile'
            }, {
              label: 'Đăng xuất',
              icon: 'pi pi-sign-out',
              routerLink: '/logout'
            }
          ]
        },
      ];
    }
  }

  viewdetail(id: any) {
    this.storeService.getStoreDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  
  getNotification(){
    var userJson=JSON.parse(this.user);
    this.notifyService.getNotifications(userJson.userID, this.page).toPromise().then((result) => {
      if (result.success) {
        this.notilist = result.data;
        this.totalPage = result.totalPage;
        console.log(this.notilist);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }

  requestPermission() {
    const app = initializeApp(environment.firebase);
    const messaging = getMessaging(app);
    getToken(messaging,
      { vapidKey: "BLPi04v_CZMNOOxR-3sxwTuKPjkphknlWrNm_JAth-B7GnEKA4rJc16Hd93xuMtWE-aOjmF4rCUxueQsz5six2g" }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
            localStorage.setItem("FCM", currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  }
  listen() {
    const app = initializeApp(environment.firebase);
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
      this.page=1;
      this.getNotification();
    });
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getNotification();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getNotification();
    }
  }
  loadNoti(){
    this.page=1;
    this.getNotification();
    
  }
}
