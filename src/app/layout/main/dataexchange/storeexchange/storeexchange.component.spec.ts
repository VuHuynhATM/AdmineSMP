import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreexchangeComponent } from './storeexchange.component';

describe('StoreexchangeComponent', () => {
  let component: StoreexchangeComponent;
  let fixture: ComponentFixture<StoreexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreexchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
