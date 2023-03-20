import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserexchangeComponent } from './userexchange.component';

describe('UserexchangeComponent', () => {
  let component: UserexchangeComponent;
  let fixture: ComponentFixture<UserexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserexchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
