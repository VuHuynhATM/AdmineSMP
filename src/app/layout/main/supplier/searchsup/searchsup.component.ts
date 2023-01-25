import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupplierService } from 'src/app/service/supplier/supplier.service';

@Component({
  selector: 'app-searchsup',
  templateUrl: './searchsup.component.html',
  styleUrls: ['./searchsup.component.scss'],
  providers: [MessageService]
})
export class SearchsupComponent implements OnInit {
  listSupplier!: any;
  search!: string;
  page: number = 1;
  status: any = "";
  statuses!: any[];
  totalPage!: number;

  constructor(private storeService: SupplierService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.statuses=[
      { label: 'Trạng thái', value: '' },
      { label: 'Hoạt động', value: '1' },
      { label: 'Khóa', value: '2' },
      { label: 'Chờ kích hoạt', value: '3' },
      { label: 'Ẩn', value: '4' }
    ]
    this.getlistsupplier();

  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistsupplier();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistsupplier();
    }
  }
  getlistsupplier() {
    console.log(this.search+this.page+this.status);
    this.storeService.getListStoreSearch(this.search, this.page, this.status).subscribe((result) => {
      this.listSupplier = result.data;
      this.totalPage = result.totalPage;
      console.log(result);

    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
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
