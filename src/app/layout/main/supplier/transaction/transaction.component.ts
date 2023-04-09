import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SystemService } from 'src/app/service/system/system.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  listtransaction!:any;
  storeID!: any;
  page: number = 1;
  orderID: any = "";
  totalPage!: number;
  from!: any;
  to!: any;
  checkbtn:boolean=false;

  constructor(private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService) {
    this.storeID = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getlisttransaction();
  }
  searchtransaction() {
    this.page = 1;
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
  getlisttransaction(){
    this.checkbtn=true;
    this.systemService.getStoreReveneu(this.storeID, this.page, this.orderID, this.from, this.to).toPromise().then((result) => {
      this.listtransaction = result.data;
      this.totalPage = result.totalPage;
      console.log(result);
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }

}
