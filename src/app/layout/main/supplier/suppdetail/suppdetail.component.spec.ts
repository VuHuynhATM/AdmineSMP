import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppdetailComponent } from './suppdetail.component';

describe('SuppdetailComponent', () => {
  let component: SuppdetailComponent;
  let fixture: ComponentFixture<SuppdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
