import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SystemService } from 'src/app/service/system/system.service';


@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss']
})
export class InfopageComponent implements OnInit {

  systemInfo: any = {
    systemID: 0,
    commission_Precent: 0,
    asset: 0,
    amountActive: 0,
    refund_Precent: 0,
    isActive: true,
    totalCustomer: 0,
    totalSupplier: 0,
    totalItem: 0,
    totalOrder:0
  };
  displayCommission_Precent!: boolean;
  Commission_Precent!: any;
  displayAmount!: boolean;
  Amount!: any;
  displayRefund_Precent!: boolean;
  Refund_Precent!: any;

  basicData: any;
  basicOptions: any;
  year!: any;
  maxyear: any;

  constructor(
    private systemService: SystemService,
    private messageService: MessageService,
  ) {
    this.getSystemInfo();
  }

  ngOnInit(): void {
    this.getChart();
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.maxyear = new Date();
    this.maxyear.setFullYear(nextYear);
  }

  getSystemInfo() {
    this.systemService.getSystemInfo().subscribe((result) => {
      if (result.success) {
        this.systemInfo = result.data;
        this.systemInfo.commission_Precent = this.systemInfo.commission_Precent * 100;
        this.systemInfo.refund_Precent = this.systemInfo.refund_Precent * 100;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
  }

  showCommission_PrecentDialog() {
    this.Commission_Precent = this.systemInfo.commission_Precent;
    this.displayCommission_Precent = true;
  }
  editCommission_PrecentDialog() {
    if (this.Commission_Precent < 1) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "hoa hồng lớn hơn 1" });
      return;
    }
    if (this.Commission_Precent > 99) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "hoa hồng nhỏ hơn 100" });
      return;
    }
    const precent = this.Commission_Precent;

    this.systemService.editCommission_Precent(1e-2 * precent).subscribe((result) => {
      if (result.success) {
        this.getSystemInfo();
        console.log(result.data);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
    this.displayCommission_Precent = false;
  }
  showAmount_Dialog() {
    this.Amount = this.systemInfo.amountActive;
    this.displayAmount = true;
  }
  editAmount_Dialog() {
    if (this.Amount < 1000) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Phí kích hoạt lớn hơn 1000" });
      return;
    }
    if (this.Amount > 999999999) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Phí kích hoạt nhỏ hơn 1000000000" });
      return;
    }

    this.systemService.editAmount_Precent(this.Amount).subscribe((result) => {
      if (result.success) {
        this.getSystemInfo();
        console.log(result.data);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
    this.displayAmount = false;
  }
  showRefund_PrecentDialog() {
    this.Refund_Precent = this.systemInfo.refund_Precent;
    this.displayRefund_Precent = true;
  }
  editRefund_PrecentDialog() {
    if (this.Refund_Precent < 1) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Phần trăm hoàn lớn hơn 1" });
      return;
    }
    if (this.Refund_Precent > 99) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Phần trăm nhỏ hơn 100" });
      return;
    }
    const precent = this.Refund_Precent;

    this.systemService.editRefund_Precent(1e-2 * precent).subscribe((result) => {
      if (result.success) {
        this.getSystemInfo();
        console.log(result.data);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
    this.displayRefund_Precent = false;
  }
  getChart(year?: number) {
    this.systemService.getChart(year).subscribe((result) => {
      if (result.success) {

        var listlabel: string[] = [];
        var liststore: Number[] = [];
        var listorder: Number[] = [];
        console.log(result);
        result.data.forEach((value: any) => {
          listlabel.push(value.time);
          liststore.push(value.amountstore);
          listorder.push(value.amountOrder);
        });
        this.basicData = {
          labels: listlabel,
          datasets: [
            {
              label: 'Mở cửa hàng',
              backgroundColor: '#42A5F5',
              data: liststore
            },
            {
              label: 'đơn hàng',
              backgroundColor: '#FFA726',
              data: listorder
            }
          ]
        };
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
  }
  changeChart() {
    console.log(this.year.getFullYear());
    this.getChart(this.year.getFullYear());
  }
  allChart() {
    this.year = undefined;
    this.getChart();
  }
}
