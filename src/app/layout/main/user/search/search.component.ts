import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
  listUser!: any;
  search!: string;
  page: number = 1;
  isactive: any = "";
  isactives!: any[];
  roleID: any = "";
  totalPage!: number;
  roleIDs!: any;
  checkbtn:boolean=false;

  constructor(private userService: UserService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getlistuser();
    this.roleIDs = [
      { label: 'Người dùng', value: '' },
      { label: 'Người mua', value: '2' },
      { label: 'Quản trị', value: '1' },
      { label: 'Nhà cung cấp', value: '3' }
    ]
    this.isactives = [
      { label: 'Trạng thái', value: '' },
      { label: 'Hoạt động', value: 'true' },
      { label: 'Khóa', value: 'false' },
    ]
  }

  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistuser();
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
      this.getlistuser();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  searchuser() {
    this.checkbtn=true;
    this.page = 1;
    console.log(this.roleID);
    this.userService.getListCustomerSearch(this.search, this.page, this.roleID, this.isactive).toPromise().then((result) => {
      this.listUser = result.data;
      this.totalPage = result.totalPage;
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  getlistuser() {
    this.checkbtn=true;
    console.log(this.roleID);
    this.userService.getListCustomerSearch(this.search, this.page, this.roleID, this.isactive).toPromise().then((result) => {
      this.listUser = result.data;
      this.totalPage = result.totalPage;
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewdetail(id: any) {
    this.checkbtn=true;
    this.userService.getUserDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("USER_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/userdetail/'+id]);
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