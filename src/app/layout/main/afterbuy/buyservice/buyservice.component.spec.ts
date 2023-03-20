import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyserviceComponent } from './buyservice.component';

describe('BuyserviceComponent', () => {
  let component: BuyserviceComponent;
  let fixture: ComponentFixture<BuyserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
