import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTrinhDoHVComponent } from './chi-tiet-trinh-do-hv.component';

describe('ChiTietTrinhDoHVComponent', () => {
  let component: ChiTietTrinhDoHVComponent;
  let fixture: ComponentFixture<ChiTietTrinhDoHVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietTrinhDoHVComponent]
    });
    fixture = TestBed.createComponent(ChiTietTrinhDoHVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
