import { HttpErrorResponse } from '@angular/common/http';
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
  statusText!:string;
  showBlock!:any;
  checkbtn:boolean=false;

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
    console.log(this.supplier);
  }

  viewitem() {
    this.router.navigate(['/searchitem/' + this.storeID]);
  }
  viewtransaction(){
    this.router.navigate(['/suptransaction/' + this.storeID]);
  }
  activeStore(storeID: number) {
    this.checkbtn=true;
    this.storeService.activeStore(storeID).toPromise().then((result) => {
      if (result.success) {
        this.viewdetail(this.storeID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  blockStore(storeID: number) {
    this.checkbtn=true;
    this.storeService.blockStore(storeID, this.statusText).toPromise().then((result) => {
      if (result.success) {
        this.viewdetail(storeID);
        this.showBlock=false;
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewdetail(id: any) {
    this.checkbtn=true;
    this.storeService.getStoreDetail(id).toPromise().then((result) => {
      if (result.success) {
        this.supplier = result.data;
        this.price = new Intl.NumberFormat('en-DE').format(this.supplier.asset);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
}
