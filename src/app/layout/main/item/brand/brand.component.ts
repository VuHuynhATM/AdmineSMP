import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BrandService } from 'src/app/service/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands!: any;
  brandID!: any;
  Motorcycles!: any;
  displayAddBrand!: any;
  brandName!: any;
  displayAddMotorcyle!: any;
  motorcycleName!: any;
  constructor(private messageService: MessageService,
    private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrand();
  }
  getBrand() {
    this.brandService.getlistBrand().subscribe((result) => {
      if (result.success) {
        this.brands = result.data;
        console.log(this.brands);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockBrand(id: number) {
    this.brandService.blockBrand(id).subscribe((result) => {
      if (result.success) {
        this.getBrand();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  activeBrand(id: number) {
    this.brandService.activeBrand(id).subscribe((result) => {
      if (result.success) {
        this.getBrand();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getsubcategory(id: number) {
    this.brandService.getlistMotor(id).subscribe((result) => {
      if (result.success) {
        this.Motorcycles = result.data;
        this.brandID = id;
        console.log(this.Motorcycles);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockMotorcycle(id: number) {
    this.brandService.blockBrandModel(id).subscribe((result) => {
      if (result.success) {
        this.getsubcategory(this.brandID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  activeMotorcycle(id: number) {
    this.brandService.activeBrandModel(id).subscribe((result) => {
      if (result.success) {
        this.getsubcategory(this.brandID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  addBrand() {
    if (this.brandName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.brandService.createBrand(this.brandName).subscribe((result) => {
        if (result.success) {
          this.getBrand();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddBrand=false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }
  }
  addSubCategory() {
    if (this.motorcycleName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên phân loại phụ tùng" });
    } else {
      this.brandService.createBrandModel(this.motorcycleName,this.brandID).subscribe((result) => {
        if (result.success) {
          this.getsubcategory(this.brandID);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddMotorcyle=false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }

  }
}
