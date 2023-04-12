import { TestBed } from '@angular/core/testing';

import { SvendorService } from './svendor.service';

describe('SvendorService', () => {
  let service: SvendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
