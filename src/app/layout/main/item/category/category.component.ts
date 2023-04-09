import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category/category.service';
import { ItemService } from 'src/app/service/item/item.service';
import { SpecificationService } from 'src/app/service/specification/specification.service';

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
  isSpec!: any[];
  specs!: any[];
  displaySpecification!: any;
  firstIsSpec!: any[];
  subCateID!:any;
  checkbtn:boolean=false;

  constructor(private messageService: MessageService,
    private categoryService: CategoryService,
    private specificationService: SpecificationService,
    private router:Router) { }

  ngOnInit(): void {
    this.getcategory();
  }
  getcategory() {
    this.categoryService.getlistCategory().toPromise().then((result) => {
      if (result.success) {
        this.categories = result.data;
        console.log(this.categories);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  blockCategory(id: number) {
    this.checkbtn=true;
    this.categoryService.blockCategory(id).toPromise().then((result) => {
      if (result.success) {
        this.getcategory();
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
  activeCategory(id: number) {
    this.checkbtn=true;
    this.categoryService.activeCategory(id).toPromise().then((result) => {
      if (result.success) {
        this.getcategory();
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
  getsubcategory(id: number) {
    this.categoryService.getlistSubCategory(id).toPromise().then((result) => {
      if (result.success) {
        this.subcategories = result.data;
        this.categoryID = id;
        console.log(this.subcategories);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  blocksubCategory(id: number) {
    this.checkbtn=true;
    this.categoryService.blockSubCategory(id).toPromise().then((result) => {
      if (result.success) {
        this.getsubcategory(this.categoryID);
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
  activesubCategory(id: number) {
    this.checkbtn=true;
    this.categoryService.activeSubCategory(id).toPromise().then((result) => {
      if (result.success) {
        this.getsubcategory(this.categoryID);
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
  addCategory() {
    this.checkbtn=true;
    if (this.categoryName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.categoryService.createCategory(this.categoryName).toPromise().then((result) => {
        if (result.success) {
          this.getcategory();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAdCategory = false;
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
  addSubCategory() {
    this.checkbtn=true;
    if (this.subcategoryName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên phân loại phụ tùng" });
    } else {
      this.categoryService.createSubCategory(this.subcategoryName, this.categoryID).toPromise().then((result) => {
        if (result.success) {
          this.getsubcategory(this.categoryID);
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displaysubAdCategory = false;
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
  getSpecification(id: number) {
    this.subCateID=id;
    this.specificationService.getlistSubCate_Specification(id).toPromise().then((result) => {
      if (result.success) {
        this.isSpec = result.data.ispecs;
        this.firstIsSpec = result.data.ispecs;
        this.specs = result.data.nonpecs;
        this.displaySpecification = true;
        console.log(result);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  addSpecification() {
    this.checkbtn=true;
    var addspec: any[] = [];
    var removespec: any[] = [];
    this.isSpec.forEach((value: any) => {
      var index = this.firstIsSpec.indexOf(value);
      if (index < 0) {
        addspec.push(value.specificationID);
      }
    });
    this.firstIsSpec.forEach((value: any) => {
      var index = this.isSpec.indexOf(value);
      if (index < 0) {
        removespec.push(value.specificationID);
      }
    });
    this.specificationService.addSpecification(this.subCateID,addspec,removespec).toPromise().then((result) => {
      if (result.success) {
        this.getSpecification(this.subCateID);
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
