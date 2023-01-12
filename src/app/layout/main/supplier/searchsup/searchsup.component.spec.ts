import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsupComponent } from './searchsup.component';

describe('SearchsupComponent', () => {
  let component: SearchsupComponent;
  let fixture: ComponentFixture<SearchsupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchsupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
