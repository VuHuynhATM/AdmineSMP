import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  user!: any;
  notilist!:any;
  check:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.notilist=[
      {name:"thông báo 1"},
      {name:"thông báo 2"},
      {name:"thông báo 3"},
      {name:"thông báo 4"},
      {name:"thông báo 5"},
      {name:"thông báo 6"},
    ]
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
}
