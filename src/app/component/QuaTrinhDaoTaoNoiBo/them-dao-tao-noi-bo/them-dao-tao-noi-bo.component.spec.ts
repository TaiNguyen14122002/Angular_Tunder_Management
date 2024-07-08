import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDaoTaoNoiBoComponent } from './them-dao-tao-noi-bo.component';

describe('ThemDaoTaoNoiBoComponent', () => {
  let component: ThemDaoTaoNoiBoComponent;
  let fixture: ComponentFixture<ThemDaoTaoNoiBoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemDaoTaoNoiBoComponent]
    });
    fixture = TestBed.createComponent(ThemDaoTaoNoiBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
