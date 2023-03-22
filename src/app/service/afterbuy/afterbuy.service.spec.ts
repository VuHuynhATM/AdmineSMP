import { TestBed } from '@angular/core/testing';

import { AfterbuyService } from './afterbuy.service';

describe('AfterbuyService', () => {
  let service: AfterbuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterbuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
