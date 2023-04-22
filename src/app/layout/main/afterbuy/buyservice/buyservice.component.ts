import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AfterbuyService } from 'src/app/service/afterbuy/afterbuy.service';
import { ItemService } from 'src/app/service/item/item.service';
import { OrderService } from 'src/app/service/order/order.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-buyservice',
  templateUrl: './buyservice.component.html',
  styleUrls: ['./buyservice.component.scss']
})
export class BuyserviceComponent implements OnInit {

  idstoreparam!: any;
  iduserparam!: any;
  idorderparam!: any;
  idserviceparam!: any;

  showdiglog!: any;
  link!: any;

  listorder!: any;

  serviceID!: any;
  orderID!: any;
  userID!: any;
  storeID!: any;
  dateFrom!: any;
  dateTo!: any;
  serviceStatus!: any;
  serviceStatuses!: any;
  serviceType!: any;
  serviceTypes!: any;
  page: any = 1;
  totalPage!: any;
  shiplist!: any;
  checkbtn: boolean = false;
  displayCancelOrder: boolean = false;
  reason!: any;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: SupplierService,
    private userService: UserService,
    private afterBuyService: AfterbuyService,
    private itemService: ItemService) {
    this.idstoreparam = this.route.snapshot.queryParamMap.get('storeID')!;
    this.iduserparam = this.route.snapshot.queryParamMap.get('userID')!;
    this.idorderparam = this.route.snapshot.queryParamMap.get('orderID')!;
    this.idserviceparam = this.route.snapshot.queryParamMap.get('serviceID')!;

  }
  ngOnInit(): void {
    console.log(this.idstoreparam);
    if (this.idstoreparam != 0) {
      this.storeID = this.idstoreparam;
    }
    if (this.idorderparam != 0) {
      this.orderID = this.idorderparam;
    }
    if (this.iduserparam != 0) {
      this.userID = this.iduserparam;
    }
    if (this.idserviceparam != 0) {
      this.serviceID = this.idserviceparam;
    }
    this.serviceStatuses = [
      { label: 'Trạng thái', value: '' },
      { label: 'Hoàn thành', value: '1' },
      { label: 'Hủy', value: '2' },
      { label: 'Chờ xác nhận', value: '3' },
      { label: 'Đã xác nhận', value: '5' },
      { label: 'Yêu cầu xữ lý', value: '6' },
    ]
    this.serviceTypes = [
      { label: 'Trạng thái', value: '' },
      { label: 'Đổi hàng', value: '1' },
      { label: 'Hoàn tiền', value: '2' },
    ]
    this.getlistservice();
  }

  next() {
    this.checkbtn = true;
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistservice();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    this.checkbtn = false;
  }

  prev() {
    this.checkbtn = true;
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistservice();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    this.checkbtn = false;
  }

  searchservice() {
    this.checkbtn = true;
    this.page = 1;
    this.getlistservice();
    this.checkbtn = false;
  }

  getlistservice() {
    this.checkbtn = true;
    this.afterBuyService.getlistService(this.userID, this.storeID, this.dateFrom, this.dateTo, this.serviceStatus, this.page, this.orderID, this.serviceID, this.serviceType).toPromise().then((result) => {
      if (result.success) {
        this.listorder = result.data;
        this.totalPage = result.totalPage;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  getliststatus(id: number) {
    this.checkbtn = true;
    this.shiplist = undefined;
    this.afterBuyService.getShipstatus(id).toPromise().then((result) => {
      if (result.success) {
        this.shiplist = result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  viewuserdetail(id: any) {
    this.checkbtn = true;
    this.userService.getUserDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("USER_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/userdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  viewstoredetail(id: any) {
    this.checkbtn = true;
    this.storeService.getStoreDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  viewitemdetail(id: number) {
    this.checkbtn = true;
    this.itemService.getItemDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("ITEM_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/itemdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  acceptservice(id: number) {
    this.checkbtn = true;
    this.afterBuyService.acceptervice(id).toPromise().then((result) => {
      if (result.success) {
        this.getlistservice();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  cancelservice(id: number) {
    this.checkbtn = true;
    this.afterBuyService.canceltervice(id).toPromise().then((result) => {
      if (result.success) {
        this.getlistservice();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
    this.checkbtn = false;
  }
  showvideo(linki: any) {
    this.checkbtn = true;
    this.link = undefined;
    this.showdiglog = true;
    this.link = linki;
    console.log(this.link);
    this.checkbtn = false;
  }
  NumberCurency(value: number): any {
    return new Intl.NumberFormat('en-DE').format(value);
  }
}
