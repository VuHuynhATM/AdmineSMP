import { HttpErrorResponse } from '@angular/common/http';
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
  checkbtn:boolean=false;

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
      this.getlistsupplier();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }
  getlistsupplier() {
    this.checkbtn=true;
    console.log(this.search+this.page+this.status);
    this.storeService.getListStoreSearch(this.search, this.page, this.status).toPromise().then((result) => {
      this.listSupplier = result.data;
      this.totalPage = result.totalPage;
      console.log(result);

      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      console.log(err);
      // if(err.status==401)
      // this.router.navigate(['/logout']);
    });
  }
  viewdetail(id: any) {
    this.checkbtn=true;
    this.storeService.getStoreDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
}
