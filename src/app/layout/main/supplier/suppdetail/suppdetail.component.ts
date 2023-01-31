import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-suppdetail',
  templateUrl: './suppdetail.component.html',
  styleUrls: ['./suppdetail.component.scss']
})
export class SuppdetailComponent implements OnInit {

  supplier!: any;
  check: boolean = true;
  address!: any;
  storeID!: any;
  price!: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: SupplierService
  ) {
    this.storeID = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.viewdetail(this.storeID);
  }

  viewitem() {
    this.router.navigate(['/searchitem/' + this.storeID]);
  }
  vieworder() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'storeID': this.storeID },
      fragment: 'anchor'
    };
    this.router.navigate(['/order']);

  }
  activeStore(storeID: number) {
    this.storeService.activeStore(storeID).subscribe((result) => {
      if (result.success) {
        this.viewdetail(this.storeID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockStore(storeID: number) {
    console.log(storeID);
    this.storeService.blockStore(storeID).subscribe((result) => {
      if (result.success) {
        this.viewdetail(storeID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewdetail(id: any) {
    this.storeService.getStoreDetail(id).subscribe((result) => {
      if (result.success) {
        this.supplier = result.data;
        this.price = new Intl.NumberFormat('en-DE').format(this.supplier.asset);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
