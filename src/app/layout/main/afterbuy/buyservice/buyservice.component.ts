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

  listorder!: any;

  serviceID!:any;
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
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistservice();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistservice();
    }
  }

  searchservice() {
    this.page = 1;
    this.getlistservice();
  }

  getlistservice() {
    this.afterBuyService.getlistService(this.userID, this.storeID, this.dateFrom, this.dateTo, this.serviceStatus, this.page, this.orderID, this.serviceID,this.serviceType).subscribe((result) => {
      if (result.success) {
        this.listorder = result.data;
        console.log(this.listorder);
        this.totalPage = result.totalPage;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getliststatus(id: number) {
    this.shiplist = undefined;
    this.afterBuyService.getShipstatus(id).subscribe((result) => {
      if (result.success) {
        this.shiplist = result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewuserdetail(id: any) {
    this.userService.getUserDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("USER_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/userdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewstoredetail(id: any) {
    this.storeService.getStoreDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewitemdetail(id: number) {
    this.itemService.getItemDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("ITEM_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/itemdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  acceptservice(id: number) {
    this.afterBuyService.acceptervice(id).subscribe((result) => {
      if (result.success) {
        this.getlistservice();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  cancelservice(id: number) {
    this.afterBuyService.canceltervice(id).subscribe((result) => {
      if (result.success) {
        this.getlistservice();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
