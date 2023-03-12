import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemService } from 'src/app/service/item/item.service';
import { SupplierService } from 'src/app/service/supplier/supplier.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss']
})
export class ItemdetailComponent implements OnInit {
  itemID!: any;
  item!: any;
  firstPrice!: any;
  secondPrice!: any;
  discount!: any;
  subitem!: any;
  page: any = 1;
  totalpage: any = 2;
  warrantiesTime!:any;
  statusText!:string;
  showBlock!:any;
  statusTextSub!:string;
  showBlockSub!:any;


  constructor(private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private storeService: SupplierService) {
    this.itemID = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.viewdetail(this.itemID);
    
  }
  viewdetail(id: number) {
    this.itemService.getItemDetail(id).subscribe((result) => {
      if (result.success) {
        this.item = result.data;
        if (this.item.discount != 0) {
          if (this.item.minPrice != this.item.maxPrice)
            this.firstPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice) + 'VND - ' + new Intl.NumberFormat('en-DE').format(this.item.maxPrice) + 'VND';
          else
            this.firstPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice) + 'VND';
          this.secondPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice * (1 - this.item.discount)) + 'VND';
          this.discount = this.item.discount * 100 + '% Giảm'
        } else {
          this.secondPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice * (1 - this.item.discount)) + 'VND';
        }
        this.warrantiesTime=this.item.warrantiesTime;

      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  onSubItem(id: number) {
    this.item.listSubItem.forEach((sub: any) => {
      if (sub.sub_ItemID == id) {
        this.subitem = sub;
        console.log(this.subitem);
        if (this.item.discount != 0) {
          this.firstPrice = new Intl.NumberFormat('en-DE').format(sub.price) + 'VND';
        } else {
          this.firstPrice = undefined;
        }
        this.secondPrice = new Intl.NumberFormat('en-DE').format(sub.price * (1 - this.item.discount)) + 'VND';
        this.warrantiesTime=sub.warrantiesTime;
      }
    });
  }
  offSubItem(id: number) {
    this.subitem = undefined;
    if (this.item.discount != 0) {
      if (this.item.minPrice != this.item.maxPrice)
        this.firstPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice) + 'VND - ' + new Intl.NumberFormat('en-DE').format(this.item.maxPrice) + 'VND';
      else
        this.firstPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice) + 'VND';
      this.secondPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice * (1 - this.item.discount)) + 'VND';
      this.discount = this.item.discount * 100 + '% Giảm'
    } else {
      this.secondPrice = new Intl.NumberFormat('en-DE').format(this.item.minPrice * (1 - this.item.discount)) + 'VND';
    }
    this.warrantiesTime=this.item.warrantiesTime;
  }
  activeItem(id: number) {
    this.itemService.activeItem(id).subscribe((result) => {
      if (result.success) {
        this.viewdetail(this.itemID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  activeSubItem(id: number) {
    this.itemService.activeSubItem(id).subscribe((result) => {
      if (result.success) {
        this.viewdetail(this.itemID);
        console.log(this.item);
        this.item.listSubItem.forEach((sub: any) => {
          if (sub.sub_ItemID == id) {
            this.subitem = sub;
            console.log(this.subitem);
            if (this.item.discount != 0) {
              this.firstPrice = new Intl.NumberFormat('en-DE').format(sub.price) + 'VND';
            } else {
              this.firstPrice = undefined;
            }
            this.secondPrice = new Intl.NumberFormat('en-DE').format(sub.price * (1 - this.item.discount)) + 'VND';
            this.warrantiesTime=sub.warrantiesTime;
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockItem(id: number) {
    this.itemService.blockItem(id, this.statusText).subscribe((result) => {
      if (result.success) {
        this.viewdetail(this.itemID);
        this.showBlock=false;
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockSubItem(id: number) {
    this.itemService.blockSubItem(id, this.statusTextSub).subscribe((result) => {
      if (result.success) {
        this.viewdetail(this.itemID);
        console.log(this.item);
        this.item.listSubItem.forEach((sub: any) => {
          if (sub.sub_ItemID == id) {
            this.subitem = sub;
            console.log(this.subitem);
            if (this.item.discount != 0) {
              this.firstPrice = new Intl.NumberFormat('en-DE').format(sub.price) + 'VND';
            } else {
              this.firstPrice = undefined;
            }
            this.secondPrice = new Intl.NumberFormat('en-DE').format(sub.price * (1 - this.item.discount)) + 'VND';
            this.warrantiesTime=sub.warrantiesTime;
          }
        });
        this.showBlockSub=false;
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  viewstoredetail(id: any) {
    this.storeService.getStoreDetail(id).subscribe((result) => {
      if (result.success) {
        localStorage.setItem("STORE_DETAIL", JSON.stringify(result.data))
        this.router.navigate(['/supplierdetail/' + id]);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getlisFeedback() {
    this.page = this.page++;
    this.itemService.getlistFeedback(this.itemID, this.page).subscribe((result) => {
      if (result.success) {
        this.totalpage = result.totalPage;
        this.item.listFeedBack = result.data;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
