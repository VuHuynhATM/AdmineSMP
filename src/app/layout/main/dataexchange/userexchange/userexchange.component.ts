import { HttpErrorResponse } from '@angular/common/http';
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
  checkbtn:boolean=false;

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
    this.checkbtn=true;
    this.page=1;
    this.getlistexchange();
    this.checkbtn=false;
  }
  next() {
    this.checkbtn=true;
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistexchange();
    }
    this.checkbtn=false;
  }

  prev() {
    this.checkbtn=true;
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistexchange();
    }
    this.checkbtn=false;
  }

  getlistexchange() {
    this.checkbtn=true;
    this.dataExchangeService.getUserExchange(this.userID, this.orderID, this.serviceID, this.dateFrom, this.dateTo, this.serviceStatus, this.page).toPromise().then((result) => {
      if (result.success) {
        this.listexchange = result.data;
        console.log(this.listexchange);
        this.totalPage = result.totalPage;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
    this.checkbtn=false;
  }
  showFinish(id:number){
    this.displayfinish=true;
    this.exchangeID=id;
  }
  successexchange(event: any) {
    this.checkbtn=true;
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.dataExchangeService.finishUserExchange(this.exchangeID, this.uploadedFile).toPromise().then((result) => {
      if (result.success) {
        this.getlistexchange();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displayfinish = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
    this.checkbtn=false;
  }
}
