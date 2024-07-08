import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemThamGiaDuAnComponent } from './them-tham-gia-du-an.component';

describe('ThemThamGiaDuAnComponent', () => {
  let component: ThemThamGiaDuAnComponent;
  let fixture: ComponentFixture<ThemThamGiaDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemThamGiaDuAnComponent]
    });
    fixture = TestBed.createComponent(ThemThamGiaDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
