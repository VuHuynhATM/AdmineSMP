import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemService } from 'src/app/service/item/item.service';
import { OrderService } from 'src/app/service/order/order.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { SystemService } from 'src/app/service/system/system.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  listReport!: any;
  storeID!: any;
  userID!: any;
  page: number = 1;
  reportType: any = 1;
  reportTypes!: any[];
  totalPage!: number;
  reportTypeCurren!:any;
  checkbtn:boolean=false;

  constructor(private systemService: SystemService,
    private storeService: SupplierService,
    private itemService:ItemService,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.reportTypes=[
      { label: 'Đánh giá', value: '1' },
      { label: 'Gian hàng', value: '2' },
      { label: 'Phụ tùng', value: '3' }
    ];
    this.getListreport();
    this.reportTypeCurren=this.reportType;
  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getListreport();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getListreport();
    }
  }
  searchreport(){
    this.page=1;
    this.reportTypeCurren=this.reportType;
    this.getListreport();
  }

  getListreport(){
    this.checkbtn=true;
    this.systemService.getReport(this.page,this.reportType,this.storeID,this.userID).toPromise().then((result) => {
      this.listReport = result.data;
      this.totalPage = result.totalPage;
      console.log(this.listReport);
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewdetailSupplier(id: any) {
    this.checkbtn=true;
    this.storeService.getStoreDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewdetailItem(id:number){
    this.checkbtn=true;
    this.itemService.getItemDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("ITEM_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/itemdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewFeedbackDetail(detailID: number) {
    this.checkbtn=true;
    this.orderService.getFeedbackDetail(detailID).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("FEEDBACK_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/feedbackdetail/' + detailID]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
}
