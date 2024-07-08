import { TestBed } from '@angular/core/testing';

import { DaoTaoNoiBoService } from './dao-tao-noi-bo.service';

describe('DaoTaoNoiBoService', () => {
  let service: DaoTaoNoiBoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaoTaoNoiBoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
