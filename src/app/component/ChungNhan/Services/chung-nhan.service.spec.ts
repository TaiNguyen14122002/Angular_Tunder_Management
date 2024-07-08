import { TestBed } from '@angular/core/testing';

import { ChungNhanService } from './chung-nhan.service';

describe('ChungNhanService', () => {
  let service: ChungNhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChungNhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
