import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQuaTrinhCongTacComponent } from './table-qua-trinh-cong-tac.component';

describe('TableQuaTrinhCongTacComponent', () => {
  let component: TableQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<TableQuaTrinhCongTacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableQuaTrinhCongTacComponent]
    });
    fixture = TestBed.createComponent(TableQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
