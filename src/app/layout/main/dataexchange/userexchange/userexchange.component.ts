import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataexchangeService } from 'src/app/service/dataexchange/dataexchange.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-userexchange',
  templateUrl: './userexchange.component.html',
  styleUrls: ['./userexchange.component.scss']
})
export class UserexchangeComponent implements OnInit {

  exchangeID!:any;
  listexchange!: any;

  orderID!: any;
  userID!: any;
  serviceID!: any;
  dateFrom!: any;
  dateTo!: any;
  serviceStatuses!: any;
  serviceStatus!: any;
  page: any = 1;
  totalPage!: any;
  uploadedFile!: any;
  displayfinish!:any;

  constructor(private messageService: MessageService,
    private router: Router,
    private dataExchangeService: DataexchangeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.serviceStatuses = [
      { label: 'Trạng thái', value: '' },
      { label: 'Đã đối soát', value: '1' },
      { label: 'Chờ Đối soát', value: '4' },
      { label: 'Chờ xác nhận', value: '3' },

    ]
    this.getlistexchange();
  }
  searchexchange(){
    this.page=1;
    this.getlistexchange();
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistexchange();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistexchange();
    }
  }

  getlistexchange() {
    this.dataExchangeService.getUserExchange(this.userID, this.orderID, this.serviceID, this.dateFrom, this.dateTo, this.serviceStatus, this.page).subscribe((result) => {
      if (result.success) {
        this.listexchange = result.data;
        console.log(this.listexchange);
        this.totalPage = result.totalPage;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  showFinish(id:number){
    this.displayfinish=true;
    this.exchangeID=id;
  }
  successexchange(event: any) {
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.dataExchangeService.finishUserExchange(this.exchangeID, this.uploadedFile).subscribe((result) => {
      if (result.success) {
        this.getlistexchange();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displayfinish = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
