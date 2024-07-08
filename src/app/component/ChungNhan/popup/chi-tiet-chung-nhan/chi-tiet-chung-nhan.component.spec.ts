import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietChungNhanComponent } from './chi-tiet-chung-nhan.component';

describe('ChiTietChungNhanComponent', () => {
  let component: ChiTietChungNhanComponent;
  let fixture: ComponentFixture<ChiTietChungNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietChungNhanComponent]
    });
    fixture = TestBed.createComponent(ChiTietChungNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
