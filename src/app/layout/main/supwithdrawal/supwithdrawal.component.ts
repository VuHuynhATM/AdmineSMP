import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SystemService } from 'src/app/service/system/system.service';

@Component({
  selector: 'app-supwithdrawal',
  templateUrl: './supwithdrawal.component.html',
  styleUrls: ['./supwithdrawal.component.scss'],
  providers: [MessageService]
})
export class SupwithdrawalComponent implements OnInit {
  withdrawalID!: any;
  uploadedFile!: any;
  displaysuccess!: any;
  displaycancel!: any;
  reason!: string;
  listWithdrawal!: any;
  storeID!: any;
  page: number = 1;
  status: any = "";
  statuses!: any[];
  totalPage!: number;
  from!: any;
  to!: any;
  idstoreparam!: any;
  checkbtn: boolean = false;

  constructor(private systemService: SystemService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.idstoreparam = this.route.snapshot.queryParamMap.get('storeID')!;
  }

  ngOnInit(): void {
    this.statuses = [
      { label: 'trạng thái', value: '' },
      { label: 'Chờ tiếp nhận', value: '1' },
      { label: 'Đang xử lí', value: '2' },
      { label: 'Huỷ', value: '3' },
      { label: 'Hoàn thành', value: '4' },
    ]
    this.getlistsupplierWithdrawal();
    if (this.idstoreparam != 0) {
      this.storeID = this.idstoreparam;
    }
  }
  searchwithdrawal() {
    this.page = 1;
    this.getlistsupplierWithdrawal();
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistsupplierWithdrawal();
    }
  }
  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistsupplierWithdrawal();
    }
  }
  getlistsupplierWithdrawal() {
    this.checkbtn = true;
    this.systemService.getStoreWithdrawal(this.storeID, this.page, this.status, this.from, this.to).toPromise().then((result) => {
      this.listWithdrawal = result.data;
      this.totalPage = result.totalPage;
      console.log(result);
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  acceptwithdrawal(id: number) {
    this.checkbtn = true;
    this.systemService.aceptwithdrawal(id).toPromise().then((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaysuccess = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  showCancel(id: number) {
    this.checkbtn = true;
    this.withdrawalID = id;
    this.displaycancel = true;
    this.checkbtn = false;
  }
  cancelwithdarawl() {
    this.checkbtn = true;
    if (this.reason == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập lý do" });
      this.checkbtn = false;
      return;
    }
    this.systemService.cancelwithdarawl(this.withdrawalID, this.reason).toPromise().then((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaycancel = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  showSuccess(id: number) {
    this.checkbtn = true;
    this.withdrawalID = id;
    this.displaysuccess = true;
    this.checkbtn = false;
  }
  successwithdrawal(event: any) {
    this.checkbtn=true;
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.systemService.successwithdrawal(this.withdrawalID, this.uploadedFile).toPromise().then((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaysuccess = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
}
