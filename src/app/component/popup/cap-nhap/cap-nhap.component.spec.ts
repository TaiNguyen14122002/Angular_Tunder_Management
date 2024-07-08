import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhapComponent } from './cap-nhap.component';

describe('CapNhapComponent', () => {
  let component: CapNhapComponent;
  let fixture: ComponentFixture<CapNhapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhapComponent]
    });
    fixture = TestBed.createComponent(CapNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
