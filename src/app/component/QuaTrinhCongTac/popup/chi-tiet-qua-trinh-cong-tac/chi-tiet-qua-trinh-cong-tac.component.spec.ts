import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietQuaTrinhCongTacComponent } from './chi-tiet-qua-trinh-cong-tac.component';

describe('ChiTietQuaTrinhCongTacComponent', () => {
  let component: ChiTietQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<ChiTietQuaTrinhCongTacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietQuaTrinhCongTacComponent]
    });
    fixture = TestBed.createComponent(ChiTietQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
