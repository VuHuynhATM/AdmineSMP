import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BrandService } from 'src/app/service/brand/brand.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { ItemService } from 'src/app/service/item/item.service';

@Component({
  selector: 'app-itemsearch',
  templateUrl: './itemsearch.component.html',
  styleUrls: ['./itemsearch.component.scss'],
  providers: [MessageService]
})
export class ItemsearchComponent implements OnInit {
  page:any=1;
  visibleSidebar!:any;
  search!: any;
  sort!: any;
  sorts!: any;
  status!: any;
  statuses!: any;
  categories!:any;
  category!:any;
  subcategories!:any;
  subcategory!:any;
  storeID!:any;
  min!:any;
  max!:any;
  brands!:any;
  brand!:any;
  motors!:any;
  motor!:any;
  rating!:any;
  totalPage!: number;
  listitem!:any;
  idparam!:any
  constructor(private categoryService: CategoryService,
    private messageService: MessageService,
    private brandService: BrandService,
    private itemService:ItemService,
    private router:Router,
    private route: ActivatedRoute) { 
      this.idparam = this.route.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.sorts = [
      { label: 'Sắp xếp', value: '' },
      { label: 'Giá giảm dần', value: 'price_desc' },
      { label: 'Giá tăng dần', value: 'price_asc' },
      { label: 'Giảm giá', value: 'discount' }
    ];
    this.statuses = [
      { label: 'Trạng thái', value: '' },
      { label: 'Hoạt động', value: '1' },
      { label: 'Khóa', value: '2' },
      { label: 'Chờ kích hoạt', value: '3' },
      { label: 'Ẩn', value: '4' }
    ];
    if(this.idparam!=0){
      this.storeID=this.idparam;
    }
    this.getcategory();
    this.getbrand();
    this.getlistitem();
  }
  searchItem(){
    this.page=1;
    this.getlistitem();
    this.visibleSidebar=false;
  }
  getlistitem() {
    console.log(this.search+this.page+this.status);
    this.itemService.getListItemSearch(this.search,this.min,this.max,this.rating,this.category,this.subcategory,this.brand,this.motor,this.sort,this.storeID,this.page).subscribe((result) => {
      this.listitem = result.data;
      this.totalPage = result.totalPage;
      console.log(this.listitem);
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  next() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getlistitem();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getlistitem();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }
  getcategory() {
    var listcate:any[]=[
      { label: 'Loại phụ tùng', value: '' },
    ];
    this.categoryService.getlistCategory().subscribe((result) => {
      if (result.success) {
        result.data.forEach((cate: any) => {
          if (cate.isActive) {
            var itemcate = {
              label: cate.name,
              value: cate.categoryID
            }
            listcate.push(itemcate);
          }
        });
        this.categories=listcate;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getsubcategory(){
    this.subcategory=undefined;
    var listcate:any[]=[{
      label: 'Chi tiết', value: ''
    }];
    console.log(this.category);
    if(this.category!=undefined&&this.category!=''){
      this.categoryService.getlistSubCategory(this.category).subscribe((result) => {
        if (result.success) {
          result.data.forEach((cate: any) => {
            if (cate.isActive) {
              var itemcate = {
                label: cate.sub_categoryName,
                value: cate.sub_CategoryID
              }
              listcate.push(itemcate);
            }
          });
          this.subcategories=listcate;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }
  }
  getbrand() {
    this.motor=undefined;
    var listbrand:any[]=[
      { label: 'Hảng xe', value: '' },
    ];
    this.brandService.getlistBrand().subscribe((result) => {
      if (result.success) {
        result.data.forEach((brand: any) => {
          if (brand.isActive) {
            var itemcate = {
              label: brand.name,
              value: brand.brandID
            }
            listbrand.push(itemcate);
          }
        });
        this.brands=listbrand;
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  getmoto(){
    var listmoto:any[]=[{
      label: 'Loại xe', value: ''
    }];
    if(this.brand!=undefined&&this.brand!=''){
      this.brandService.getlistMotor(this.brand).subscribe((result) => {
        if (result.success) {
          result.data.forEach((moto: any) => {
            if (moto.isActive) {
              var itemmoto = {
                label: moto.name,
                value: moto.brand_ModelID
              }
              listmoto.push(itemmoto);
            }
          });
          this.motors=listmoto;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }
  }
  viewdetail(id:number){
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
}
