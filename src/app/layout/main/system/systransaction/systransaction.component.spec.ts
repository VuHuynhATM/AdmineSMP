import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystransactionComponent } from './systransaction.component';

describe('SystransactionComponent', () => {
  let component: SystransactionComponent;
  let fixture: ComponentFixture<SystransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
