import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDaoTaoNoiBoComponent } from './chi-tiet-dao-tao-noi-bo.component';

describe('ChiTietDaoTaoNoiBoComponent', () => {
  let component: ChiTietDaoTaoNoiBoComponent;
  let fixture: ComponentFixture<ChiTietDaoTaoNoiBoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietDaoTaoNoiBoComponent]
    });
    fixture = TestBed.createComponent(ChiTietDaoTaoNoiBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
