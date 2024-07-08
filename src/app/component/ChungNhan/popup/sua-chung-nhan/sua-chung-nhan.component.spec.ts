import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaChungNhanComponent } from './sua-chung-nhan.component';

describe('SuaChungNhanComponent', () => {
  let component: SuaChungNhanComponent;
  let fixture: ComponentFixture<SuaChungNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaChungNhanComponent]
    });
    fixture = TestBed.createComponent(SuaChungNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
