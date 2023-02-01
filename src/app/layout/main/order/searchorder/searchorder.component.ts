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

  listorder!: any;

  orderID!:any;
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
  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService,
    private storeService: SupplierService,
    private itemService: ItemService) {
    this.idstoreparam = this.route.snapshot.queryParamMap.get('storeID')!;
    console.log(this.idstoreparam);

    this.iduserparam = this.route.snapshot.queryParamMap.get('userID')!;

  }
  ngOnInit(): void {
    console.log(this.idstoreparam);
    if (this.idstoreparam != 0) {
      this.storeID = this.idstoreparam;
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
      { label: 'Giao hhàng thành công', value: '5' },
      { label: 'Trả hàng', value: '6' }
    ]
    this.getlistorder();
  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistorder();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistorder();
    }
  }

  searchorder() {
    this.page = 1;
    this.getlistorder();
  }

  getlistorder() {
    this.orderService.getlistOrder(this.userID, this.storeID, this.dateFrom, this.dateTo, this.shipStatus, this.page, this.userName,this.orderID).subscribe((result) => {
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

  getTiket(orderID: number) {
    this.orderService.getTicket(orderID).subscribe((result) => {
      if (!result.success) {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      window.open(DOMAIN + `Ship/get_ticket?orderID=${orderID}`);
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
  cancelOrder(orderID: number) {
    if (this.reason == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Nhập nguyên nhân' });
    } else {
      this.orderService.cancelorder(orderID, this.reason).subscribe((result) => {
        if (result.success) {
          this.getlistorder();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
      this.displayCancelOrder = false;
    }
  }
  getliststatus(orderID: number) {
    this.shiplist=undefined;
    this.orderService.getShipstatus(orderID).subscribe((result) => {
      if (result.success) {
        this.shiplist = result.data;
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
  viewFeedbackDetail(detailID:number) {
    this.orderService.getFeedbackDetail(detailID).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("FEEDBACK_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/feedbackdetail/' + detailID]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
