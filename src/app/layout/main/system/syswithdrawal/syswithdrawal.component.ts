import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SystemService } from 'src/app/service/system/system.service';

@Component({
  selector: 'app-syswithdrawal',
  templateUrl: './syswithdrawal.component.html',
  styleUrls: ['./syswithdrawal.component.scss']
})
export class SyswithdrawalComponent implements OnInit {

  listWithdrawal!: any;
  page: number = 1;
  totalPage!: number;
  from!: any;
  to!: any;
  displaywithdrawal!:any;
  uploadedFile!:any;
  Amount!:any;
  context!:any;
  checkbtn:boolean=false;

  constructor(private systemService: SystemService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getlistWithdrawal();
  }
  searchwithdrawal() {
    this.checkbtn=true;
    this.page = 1;
    this.getlistWithdrawal();
    this.checkbtn=false;
  }
  next() {
    this.checkbtn=true;
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistWithdrawal();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
    this.checkbtn=false;
  }
  prev() {
    this.checkbtn=true;
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistWithdrawal();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
    this.checkbtn=false;
  }
  getlistWithdrawal() {
    this.checkbtn=true;
    this.systemService.getSystemWithdrawal(this.page,this.from,this.to).toPromise().then((result) => {
      this.listWithdrawal = result.data;
      this.listWithdrawal.forEach((value:any) => {
        value.price=new Intl.NumberFormat('en-DE').format(value.price) ;
      });
      this.totalPage = result.totalPage;
      console.log(result);
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  successwithdrawal(event: any) {
    if(this.Amount<=10000){
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Số tiền rút phải lớn hơn 10.000 VND" });
      return;
    }
    if(this.context==undefined){
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập ghi chú" });
      return;
    }
    this.checkbtn=true;
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.systemService.systemwithdrawal(this.Amount,this.context, this.uploadedFile).toPromise().then((result) => {
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaywithdrawal = false;
        this.getlistWithdrawal();
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
