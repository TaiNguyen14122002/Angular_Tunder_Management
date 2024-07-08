import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemChungNhanComponent } from './them-chung-nhan.component';

describe('ThemChungNhanComponent', () => {
  let component: ThemChungNhanComponent;
  let fixture: ComponentFixture<ThemChungNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemChungNhanComponent]
    });
    fixture = TestBed.createComponent(ThemChungNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
