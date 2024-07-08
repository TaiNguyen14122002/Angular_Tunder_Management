import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaThamGiaDuAnComponent } from './sua-tham-gia-du-an.component';

describe('SuaThamGiaDuAnComponent', () => {
  let component: SuaThamGiaDuAnComponent;
  let fixture: ComponentFixture<SuaThamGiaDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaThamGiaDuAnComponent]
    });
    fixture = TestBed.createComponent(SuaThamGiaDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
