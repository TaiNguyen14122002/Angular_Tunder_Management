import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietThamGiaDuAnComponent } from './chi-tiet-tham-gia-du-an.component';

describe('ChiTietThamGiaDuAnComponent', () => {
  let component: ChiTietThamGiaDuAnComponent;
  let fixture: ComponentFixture<ChiTietThamGiaDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietThamGiaDuAnComponent]
    });
    fixture = TestBed.createComponent(ChiTietThamGiaDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
