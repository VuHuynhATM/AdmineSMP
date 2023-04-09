import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  checkbtn: boolean = false;
  constructor(private messageService: MessageService,
    private brandService: BrandService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBrand();
  }
  getBrand() {
    this.checkbtn = true;
    this.brandService.getlistBrand().toPromise().then((result) => {
      if (result.success) {
        this.brands = result.data;
        console.log(this.brands);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  blockBrand(id: number) {
    this.checkbtn = true;
    this.brandService.blockBrand(id).toPromise().then((result) => {
      if (result.success) {
        this.getBrand();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  activeBrand(id: number) {
    this.checkbtn = true;
    this.brandService.activeBrand(id).toPromise().then((result) => {
      if (result.success) {
        this.getBrand();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  getsubcategory(id: number) {
    this.checkbtn = true;
    this.brandService.getlistMotor(id).toPromise().then((result) => {
      if (result.success) {
        this.Motorcycles = result.data;
        this.brandID = id;
        console.log(this.Motorcycles);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  blockMotorcycle(id: number) {
    this.checkbtn = true;
    this.brandService.blockBrandModel(id).toPromise().then((result) => {
      if (result.success) {
        this.getsubcategory(this.brandID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  activeMotorcycle(id: number) {
    this.checkbtn = true;
    this.brandService.activeBrandModel(id).toPromise().then((result) => {
      if (result.success) {
        this.getsubcategory(this.brandID);
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 401)
        this.router.navigate(['/logout']);
    });
  }
  addBrand() {
    this.checkbtn = true;
    if (this.brandName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.brandService.createBrand(this.brandName).toPromise().then((result) => {
        if (result.success) {
          this.getBrand();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddBrand = false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
        this.checkbtn = false;
      }, (err: HttpErrorResponse) => {
        if (err.status == 401)
          this.router.navigate(['/logout']);
      });
    }
  }
  addSubCategory() {
    this.checkbtn = true;
    if (this.motorcycleName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên phân loại phụ tùng" });
    } else {
      this.brandService.createBrandModel(this.motorcycleName, this.brandID).toPromise().then((result) => {
        if (result.success) {
          this.getsubcategory(this.brandID);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddMotorcyle = false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
        this.checkbtn = false;
      }, (err: HttpErrorResponse) => {
        if (err.status == 401)
          this.router.navigate(['/logout']);
      });
    }
  }
}
