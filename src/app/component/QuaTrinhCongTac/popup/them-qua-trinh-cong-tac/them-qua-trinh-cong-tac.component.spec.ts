import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemQuaTrinhCongTacComponent } from './them-qua-trinh-cong-tac.component';

describe('ThemQuaTrinhCongTacComponent', () => {
  let component: ThemQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<ThemQuaTrinhCongTacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemQuaTrinhCongTacComponent]
    });
    fixture = TestBed.createComponent(ThemQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
