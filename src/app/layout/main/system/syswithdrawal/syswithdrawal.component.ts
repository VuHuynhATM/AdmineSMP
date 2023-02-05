import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private systemService: SystemService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getlistWithdrawal();
  }
  searchwithdrawal() {
    this.page = 1;
    this.getlistWithdrawal();
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistWithdrawal();
    }
  }
  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistWithdrawal();
    }
  }
  getlistWithdrawal() {
    this.systemService.getSystemWithdrawal(this.page,this.from,this.to).subscribe((result) => {
      this.listWithdrawal = result.data;
      this.totalPage = result.totalPage;
      console.log(result);
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  successwithdrawal(event: any) {
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.systemService.systemwithdrawal(this.Amount,this.context, this.uploadedFile).subscribe((result) => {
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displaywithdrawal = false;
        this.getlistWithdrawal();
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
