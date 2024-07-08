import { TestBed } from '@angular/core/testing';

import { TrinhDoHocVanService } from './trinh-do-hoc-van.service';

describe('TrinhDoHocVanService', () => {
  let service: TrinhDoHocVanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrinhDoHocVanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
