import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaQuaTrinhCongTacComponent } from './sua-qua-trinh-cong-tac.component';

describe('SuaQuaTrinhCongTacComponent', () => {
  let component: SuaQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<SuaQuaTrinhCongTacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaQuaTrinhCongTacComponent]
    });
    fixture = TestBed.createComponent(SuaQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
