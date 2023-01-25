import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemService } from 'src/app/service/item/item.service';
import { OrderService } from 'src/app/service/order/order.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  orderDetailID!:any;
  feedback!:any;

  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private itemService:ItemService,
    private router:Router,
    private userService: UserService) {
      this.orderDetailID = this.route.snapshot.paramMap.get('id')!;
     }

  ngOnInit(): void {
    this.feedback = JSON.parse(localStorage.getItem("FEEDBACK_DETAIL") || "");
    if (this.feedback == undefined) {
      this.viewFeedbackDetail(this.orderDetailID);
    }
  }
  viewFeedbackDetail(detailID:number) {
    this.orderService.getFeedbackDetail(detailID).subscribe((result) => {
      if (result.success) {
        this.feedback=result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewItemdetail(id:number){
    this.itemService.getItemDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("ITEM_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/itemdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewuserdetail(id: any) {
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
