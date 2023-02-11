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
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistuser();
    }
  }

  searchuser() {
    this.page = 1;
    console.log(this.roleID);
    this.userService.getListCustomerSearch(this.search, this.page, this.roleID, this.isactive).subscribe((result) => {
      this.listUser = result.data;
      this.totalPage = result.totalPage;

    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getlistuser() {
    console.log(this.roleID);
    this.userService.getListCustomerSearch(this.search, this.page, this.roleID, this.isactive).subscribe((result) => {
      this.listUser = result.data;
      this.totalPage = result.totalPage;

    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewdetail(id: any) {
    this.userService.getUserDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("USER_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/userdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}