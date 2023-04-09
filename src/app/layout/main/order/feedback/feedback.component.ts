import { HttpErrorResponse } from '@angular/common/http';
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
  checkbtn:boolean=false;

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
    console.log(this.feedback);
  }
  viewFeedbackDetail(detailID:number) {
    this.checkbtn=true;
    this.orderService.getFeedbackDetail(detailID).toPromise().then((result) => {
      if (result.success) {
        this.feedback=result.data;
        
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewItemdetail(id:number){
    this.checkbtn=true;
    this.itemService.getItemDetail(id).toPromise().then((result) => {
      if (result.success) {
        localStorage.setItem("ITEM_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/itemdetail/'+id]);
      }else{
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  viewuserdetail(id: any) {
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
  blockFeedback(id: number) {
    this.checkbtn=true;
    this.orderService.blockFeedback(id).toPromise().then((result) => {
      if (result.success) {
        this.viewFeedbackDetail(this.orderDetailID);
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
  activeFeedback(id: number) {
    this.checkbtn=true;
    this.orderService.activeFeedback(id).toPromise().then((result) => {
      if (result.success) {
        this.viewFeedbackDetail(this.orderDetailID);
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
}
