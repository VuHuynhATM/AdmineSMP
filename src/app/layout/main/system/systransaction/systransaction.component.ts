import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { SystemService } from 'src/app/service/system/system.service';

@Component({
  selector: 'app-systransaction',
  templateUrl: './systransaction.component.html',
  styleUrls: ['./systransaction.component.scss']
})
export class SystransactionComponent implements OnInit {

  listtransaction!: any;
  page: number = 1;
  totalPage!: number;
  from!: any;
  to!: any;
  options!: any;
  option: any = 1;
  curentoption:any=1;

  constructor(private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private storeService: SupplierService) { }

  ngOnInit(): void {
    this.options = [
      { label: 'Đơn hàng', value: '1' },
      { label: 'Gian hàng', value: '2' },
    ]
    this.getlisttransaction();
  }
  searchtransaction() {
    this.page = 1;
    this.curentoption=this.option;
    this.getlisttransaction();
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlisttransaction();
    }
  }
  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlisttransaction();
    }
  }
  getlisttransaction() {
    if (this.option == 1){
      this.systemService.getSystemReveneu(this.page, this.from, this.to).subscribe((result) => {
        this.listtransaction = result.data;
        this.totalPage = result.totalPage;
        console.log(result);
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }else{
      this.systemService.getSystemStoreReveneu(this.page, this.from, this.to).subscribe((result) => {
        this.listtransaction = result.data;
        this.totalPage = result.totalPage;
        console.log(result);
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    } 
  }
  viewdetail(id: any) {
    this.storeService.getStoreDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
