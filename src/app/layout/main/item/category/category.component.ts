import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category/category.service';
import { ItemService } from 'src/app/service/item/item.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService]
})
export class CategoryComponent implements OnInit {
  categories!: any;
  categoryID!: any;
  subcategories!: any;
  displayAdCategory!: any;
  categoryName!: any;
  displaysubAdCategory!: any;
  subcategoryName!: any;
  constructor(private messageService: MessageService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getcategory();
  }
  getcategory() {
    this.categoryService.getlistCategory().subscribe((result) => {
      if (result.success) {
        this.categories = result.data;
        console.log(this.categories);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockCategory(id: number) {
    this.categoryService.blockCategory(id).subscribe((result) => {
      if (result.success) {
        this.getcategory();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  activeCategory(id: number) {
    this.categoryService.activeCategory(id).subscribe((result) => {
      if (result.success) {
        this.getcategory();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getsubcategory(id: number) {
    this.categoryService.getlistSubCategory(id).subscribe((result) => {
      if (result.success) {
        this.subcategories = result.data;
        this.categoryID = id;
        console.log(this.subcategories);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blocksubCategory(id: number) {
    this.categoryService.blockSubCategory(id).subscribe((result) => {
      if (result.success) {
        this.getsubcategory(this.categoryID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  activesubCategory(id: number) {
    this.categoryService.activeSubCategory(id).subscribe((result) => {
      if (result.success) {
        this.getsubcategory(this.categoryID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  addCategory() {
    if (this.categoryName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.categoryService.createCategory(this.categoryName).subscribe((result) => {
        if (result.success) {
          this.getcategory();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAdCategory=false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }
  }
  addSubCategory() {
    if (this.subcategoryName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên phân loại phụ tùng" });
    } else {
      this.categoryService.createSubCategory(this.subcategoryName,this.categoryID).subscribe((result) => {
        if (result.success) {
          this.getsubcategory(this.categoryID);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displaysubAdCategory=false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }

  }
}
