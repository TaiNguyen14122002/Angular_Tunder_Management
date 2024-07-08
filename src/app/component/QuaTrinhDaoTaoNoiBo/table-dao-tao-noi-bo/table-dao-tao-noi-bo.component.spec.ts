import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDaoTaoNoiBoComponent } from './table-dao-tao-noi-bo.component';

describe('TableDaoTaoNoiBoComponent', () => {
  let component: TableDaoTaoNoiBoComponent;
  let fixture: ComponentFixture<TableDaoTaoNoiBoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDaoTaoNoiBoComponent]
    });
    fixture = TestBed.createComponent(TableDaoTaoNoiBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
