import { Component, OnInit } from '@angular/core';
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
  constructor(
    private specificationService:SpecificationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getSpecification();
  }
  getSpecification() {
    this.specificationService.getlistSpecification().subscribe((result) => {
      if (result.success) {
        this.specifications = result.data;
        console.log(this.specifications);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  blockSpecification(id: number) {
    this.specificationService.blockSpecification(id).subscribe((result) => {
      if (result.success) {
        this.getSpecification();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
  addSpecification() {
    if (this.specificationName == undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: "Nhập tên loại phụ tùng" });
    } else {
      this.specificationService.createSpecification(this.specificationName).subscribe((result) => {
        if (result.success) {
          this.getSpecification();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
          this.displayAddSpec=false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
      });
    }
  }
  activeSpecification(id: number) {
    this.specificationService.activeSpecification(id).subscribe((result) => {
      if (result.success) {
        this.getSpecification();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: result.message });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: result.message });
      }
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Lỗi server' });
    });
  }
}
