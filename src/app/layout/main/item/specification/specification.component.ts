import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SpecificationService } from 'src/app/service/specification/specification.service';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss'],
  providers: [MessageService]
})
export class SpecificationComponent implements OnInit {
  specifications!: any;
  displayAddSpec!: any;
  specificationName!:any;
  displaysuggest!:any;
  suggesttext:any="";
  specificationID!:any;
  checkbtn:boolean=false;

  constructor(
    private specificationService:SpecificationService,
    private messageService: MessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getSpecification();
  }
  getSpecification() {
    this.checkbtn=true;
    this.specificationService.getlistSpecification().toPromise().then((result) => {
      if (result.success) {
        this.specifications = result.data;
        console.log(this.specifications);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
      this.checkbtn=false;
    }, (err:HttpErrorResponse) => {
      if(err.status==401)
      this.router.navigate(['/logout']);
    });
  }
  blockSpecification(id: number) {
    this.checkbtn=true;
    this.specificationService.blockSpecification(id).toPromise().then((result) => {
      if (result.success) {
        this.getSpecification();
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
  addSpecification() {
    this.checkbtn=true;
    if (this.specificationName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.specificationService.createSpecification(this.specificationName).toPromise().then((result) => {
        if (result.success) {
          this.getSpecification();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddSpec=false;
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
  activeSpecification(id: number) {
    this.checkbtn=true;
    this.specificationService.activeSpecification(id).toPromise().then((result) => {
      if (result.success) {
        this.getSpecification();
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
  showsuggest(id:number){
    this.suggesttext="";
    this.displaysuggest=true;
    this.specificationID=id;
    this.specifications.forEach((value:any) => {
      if(id==value.specificationID){
        if(value.suggestValues!=null){
          value.suggestValues.forEach((element:any) => {
            if(this.suggesttext=="")
            this.suggesttext=element;
            else
            this.suggesttext=this.suggesttext+"; "+element;
          });
        }
      }
    });
  }
  editSuggest(){
    this.checkbtn=true;
    this.specificationService.addSpecificationSuggest(this.specificationID,this.suggesttext).toPromise().then((result) => {
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
        this.getSpecification();
        console.log(result);
        this.displaysuggest=false;
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
