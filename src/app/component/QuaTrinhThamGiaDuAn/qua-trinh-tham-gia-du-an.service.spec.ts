import { TestBed } from '@angular/core/testing';

import { QuaTrinhThamGiaDuAnService } from './qua-trinh-tham-gia-du-an.service';

describe('QuaTrinhThamGiaDuAnService', () => {
  let service: QuaTrinhThamGiaDuAnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuaTrinhThamGiaDuAnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
