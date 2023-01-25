import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  user!: any;
  check: boolean = true;
  notilist!: any;
  userID!: any;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userID = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    const yourid = JSON.parse(localStorage.getItem("USER") || "").userID;
    this.getUserDetail(this.userID);
    if (yourid == this.user.userID) {
      this.check = false;
    }
    this.notilist = this.user.addresses;
  }
  activeUser(userID: number) {
    this.userService.updateStatusUser(userID, true).subscribe((result) => {
      if (result.success) {
        this.user.isActive = true;
        localStorage.setItem("USER_DETAIL", JSON.stringify(this.user));
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
  }
  blockUser(userID: number) {
    this.userService.updateStatusUser(userID, false).subscribe((result) => {
      if (result.success) {
        this.user.isActive = false;
        localStorage.setItem("USER_DETAIL", JSON.stringify(this.user));
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    })
  }
  getUserDetail(id: any) {
    this.userService.getUserDetail(id).subscribe((result) => {
      if (result.success) {
        this.user= result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
