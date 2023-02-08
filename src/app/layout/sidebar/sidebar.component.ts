import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items!: MenuItem[];
  user!:any;

  constructor() { }

  ngOnInit(): void {
    this.user=localStorage.getItem("USER");
    if(this.user!=undefined){
      this.items = [
        {
          label: 'Quản lý hệ thống',
          icon: 'pi pi-fw pi-id-card',
          routerLink:'/systeminfo'
        },
        {
          label: 'Quản lý người dùng',
          icon: 'pi pi-fw pi-user',
          routerLink: '/searchuser'
        },
        {
          label: 'Quản lý gian hàng',
          icon: 'pi pi-fw pi-home',
          routerLink: '/searchsupplier'
        },
        {
          label: 'Quản lý phụ tùng',
          items:[
            {
              label:'Thông tin phụ tùng',
              icon: 'pi pi-fw pi-cog',
              routerLink: '/searchitem/0'
            },
            {
              label:'Quản lí loại phụ tùng',
              icon: 'pi pi-fw pi-tag',
              routerLink: '/category'
            },
            {
              label:'Quản lí thông số phụ tùng',
              icon: 'pi pi-fw pi-book',
              routerLink: '/specification'
            },
            {
              label:'Quản lí phương tiện/hãng',
              icon: 'pi pi-fw pi-sitemap',
              routerLink: '/brand'
            },
          ]
        },
        {
          label: 'Quản lý đơn hàng',
          icon: 'pi pi-fw pi-calendar',
          routerLink:'/order'
        },
        {
          label: 'Quản lý yêu cầu rút tiền',
          icon: 'pi pi-fw pi-wallet',
          routerLink:'/supplierwithdrawal'
        },
        {
          label: 'Quản lý báo cáo',
          icon: 'pi pi-fw pi-wallet',
          routerLink:'/report'
        },
      ]
    }
  }

}
