import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private systemService: SystemService,
    private messageService: MessageService,
    private route: ActivatedRoute) {
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
    this.systemService.getStoreWithdrawal(this.storeID, this.page, this.status, this.from, this.to).subscribe((result) => {
      this.listWithdrawal = result.data;
      this.totalPage = result.totalPage;
      console.log(result);
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  acceptwithdrawal(id: number) {
    this.systemService.aceptwithdrawal(id).subscribe((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaysuccess = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  showCancel(id: number) {
    this.withdrawalID = id;
    this.displaycancel = true;
  }
  cancelwithdarawl() {
    if (this.reason == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập lý do" });
      return;
    }
    this.systemService.cancelwithdarawl(this.withdrawalID, this.reason).subscribe((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaycancel = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  showSuccess(id: number) {
    this.withdrawalID = id;
    this.displaysuccess = true;
  }
  successwithdrawal(event: any) {
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.systemService.successwithdrawal(this.withdrawalID, this.uploadedFile).subscribe((result) => {
      if (result.success) {
        this.getlistsupplierWithdrawal();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaysuccess = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
