import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChungNhanComponent } from './table-chung-nhan.component';

describe('TableChungNhanComponent', () => {
  let component: TableChungNhanComponent;
  let fixture: ComponentFixture<TableChungNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableChungNhanComponent]
    });
    fixture = TestBed.createComponent(TableChungNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
