import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaDaoTaoNoiBoComponent } from './sua-dao-tao-noi-bo.component';

describe('SuaDaoTaoNoiBoComponent', () => {
  let component: SuaDaoTaoNoiBoComponent;
  let fixture: ComponentFixture<SuaDaoTaoNoiBoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaDaoTaoNoiBoComponent]
    });
    fixture = TestBed.createComponent(SuaDaoTaoNoiBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
