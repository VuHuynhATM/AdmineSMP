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
    totalItem: 0
  };
  displayCommission_Precent!: boolean;

  constructor(
    private systemService: SystemService,
    private messageService: MessageService,
  ) {
    this.getSystemInfo();
  }

  ngOnInit(): void {
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
    this.displayCommission_Precent = true;
  }
  editCommission_PrecentDialog() {
    this.displayCommission_Precent = false;
  }
}
