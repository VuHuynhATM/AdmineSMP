import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SystemService } from 'src/app/service/system/system.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  listReport!: any;
  storeID!: any;
  userID!: any;
  page: number = 1;
  reportType: any = 1;
  reportTypes!: any[];
  totalPage!: number;
  reportTypeCurren!:any;

  constructor(private systemService: SystemService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.reportTypes=[
      { label: 'Đánh giá', value: '1' },
      { label: 'Gian hàng', value: '2' },
      { label: 'Phụ tùng', value: '3' }
    ];
    this.getListreport();
    this.reportTypeCurren=this.reportType;
  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getListreport();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getListreport();
    }
  }
  searchreport(){
    this.page=1;
    this.reportTypeCurren=this.reportType;
    this.getListreport();
  }

  getListreport(){
    this.systemService.getReport(this.page,this.reportType,this.storeID,this.userID).subscribe((result) => {
      this.listReport = result.data;
      this.totalPage = result.totalPage;
      console.log(this.listReport);
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
