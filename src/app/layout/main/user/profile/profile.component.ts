import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {
    userName: '',
    phone: '',
    email: '',
  };
  gender!: any[];
  selectgender!: string;
  time!: string;
  displayEditName: boolean = false;
  displayEditAvarta: boolean = false;
  displayEditDoB: boolean = false;
  uploadedFile: any;

  constructor(private messageService: MessageService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER") || '');
    this.selectgender = this.user.gender;
    this.gender = [
      { label: 'Nam', value: 'Nam' },
      { label: 'Nữ', value: 'Nữ' },
      { label: 'Khác', value: 'Khác' },
    ]
    this.time = this.getTime(this.user.dateOfBirth);
  }
  getTime(time: string) {
    const year = time.split('-')[0];
    const month = time.split('-')[1];
    const day = time.split('-')[2].split('T')[0];
    const hour = time.split(':')[0].split('T')[1];
    const min = time.split(':')[1];
    const sec = time.split(':')[2];
    return month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;
  }
  showEditNameDialog() {
    this.displayEditName = true;
  }
  editName(name: string) {
    console.log(name);
    this.userService.editUserName(name, this.user.userID).subscribe((result) => {
      if (result.success) {
        this.user.userName = name;
        localStorage.setItem("USER", JSON.stringify(this.user));
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
    this.displayEditName = false;
  }
  showEditAvartaDialog() {
    this.displayEditAvarta = true;
  }
  editAvatar(event: any) {
    for (let file of event.files) {
      this.uploadedFile = file;
    }
    this.userService.editAvarta(this.uploadedFile, this.user.userID).subscribe((result) => {
      if (result.success) {
        this.user = result.data;
        localStorage.setItem("USER", JSON.stringify(this.user));
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displayEditAvarta = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  showEditDoBDialog() {
    this.displayEditDoB = true;
  }
  editDoB(times:any){
    this.userService.editDoB(times, this.user.userID).subscribe((result) => {
      if (result.success) {
        this.user = result.data;
        console.log(result);
        localStorage.setItem("USER", JSON.stringify(this.user));
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.displayEditDoB = false;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
