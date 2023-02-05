import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyswithdrawalComponent } from './syswithdrawal.component';

describe('SyswithdrawalComponent', () => {
  let component: SyswithdrawalComponent;
  let fixture: ComponentFixture<SyswithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyswithdrawalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyswithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
