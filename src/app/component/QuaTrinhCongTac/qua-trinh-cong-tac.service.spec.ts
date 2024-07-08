import { TestBed } from '@angular/core/testing';

import { QuaTrinhCongTacService } from './qua-trinh-cong-tac.service';

describe('QuaTrinhCongTacService', () => {
  let service: QuaTrinhCongTacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuaTrinhCongTacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
