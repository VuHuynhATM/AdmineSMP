import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemService } from 'src/app/service/item/item.service';
import { OrderService } from 'src/app/service/order/order.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { UserService } from 'src/app/service/user/user.service';
import { DOMAIN } from 'src/app/utils/AppConfig';

@Component({
  selector: 'app-searchorder',
  templateUrl: './searchorder.component.html',
  styleUrls: ['./searchorder.component.scss'],
  providers: [MessageService]
})
export class SearchorderComponent implements OnInit {

  idstoreparam!: any;
  iduserparam!: any;
  idorderparam!: any;

  listorder!: any;

  orderID!: any;
  userID!: any;
  userName!: any;
  storeID!: any;
  dateFrom!: any;
  dateTo!: any;
  shipStatus!: any;
  shipStatuses!: any;
  page: any = 1;
  totalPage!: any;
  shiplist!: any;

  displayCancelOrder: boolean = false;
  reason!: any;
  checkbtn: boolean = true;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService,
    private storeService: SupplierService,
    private itemService: ItemService) {
    this.idstoreparam = this.route.snapshot.queryParamMap.get('storeID')!;
    this.iduserparam = this.route.snapshot.queryParamMap.get('userID')!;
    this.idorderparam = this.route.snapshot.queryParamMap.get('orderID')!;

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
    this.shipStatuses = [
      { label: 'Trạng thái', value: '' },
      { label: 'đơn hủy', value: '-1' },
      { label: 'chưa tiếp nhận', value: '1' },
      { label: 'đã tiếp nhận', value: '2' },
      { label: 'đang lấy hàng', value: '3' },
      { label: 'đang giao hàng', value: '4' },
      { label: 'Giao hàng thành công', value: '5' },
      { label: 'Giao hàng thất bại', value: '6' },
      { label: 'Đơn hàng bị thất lạc', value: '8' },
      { label: 'Đã đối soát', value: '7' }
    ]
    this.getlistorder();

  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistorder();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistorder();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  searchorder() {
    this.page = 1;
    this.getlistorder();
  }

  getlistorder() {
    this.checkbtn = true;
    this.orderService.getlistOrder(this.userID, this.storeID, this.dateFrom, this.dateTo, this.shipStatus, this.page, this.userName, this.orderID).toPromise().then((result) => {
      if (result.success) {
        this.listorder = result.data;
        this.listorder.forEach((value:any) => {
          value.priceItem=new Intl.NumberFormat('en-DE').format(value.priceItem) ;
          value.feeShip=new Intl.NumberFormat('en-DE').format(value.feeShip) ;
        });
        console.log(this.listorder);
        this.totalPage = result.totalPage;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }

  getTiket(orderID: number) {
    this.checkbtn = true;
    this.orderService.getTicket(orderID).toPromise().then((result) => {
      console.log(result);
      if (result != null) {
        if (!result.success) {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        } else {
          // const byteArray = new Uint8Array(atob(result).split('').map(char => char.charCodeAt(0)));
          // var file = new Blob([result.data], { type: 'application/pdf' });
          // var fileURL = URL.createObjectURL(file);
          let byteChar = atob(result.data);
          let byteArray = new Array(byteChar.length);
          for (let i = 0; i < byteChar.length; i++) {
            byteArray[i] = byteChar.charCodeAt(i);
          }
          let uIntArray = new Uint8Array(byteArray);
          let blob = new Blob([uIntArray], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(blob);
          window.open(fileURL);
        }
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
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
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
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
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  cancelOrder(orderID: number) {
    this.checkbtn = true;
    if (this.reason == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Nhập nguyên nhân' });
    } else {
      this.orderService.cancelorder(orderID, this.reason).toPromise().then((result) => {
        if (result.success) {
          this.getlistorder();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
        this.checkbtn = false;
      }, (err: HttpErrorResponse) => {
        if (err.status == 401)
          this.router.navigate(['/logout']);
      });
      this.displayCancelOrder = false;
    }
  }
  getliststatus(orderID: number) {
    this.checkbtn = true;
    this.shiplist = undefined;
    this.orderService.getShipstatus(orderID).toPromise().then((result) => {
      if (result.success) {
        this.shiplist = result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
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
  viewFeedbackDetail(detailID: number) {
    this.checkbtn = true;
    this.orderService.getFeedbackDetail(detailID).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("FEEDBACK_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/feedbackdetail/' + detailID]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
}
