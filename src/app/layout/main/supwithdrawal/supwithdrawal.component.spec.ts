import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupwithdrawalComponent } from './supwithdrawal.component';

describe('SupwithdrawalComponent', () => {
  let component: SupwithdrawalComponent;
  let fixture: ComponentFixture<SupwithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupwithdrawalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
