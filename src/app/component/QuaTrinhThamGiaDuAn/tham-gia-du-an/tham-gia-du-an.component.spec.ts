import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamGiaDuAnComponent } from './tham-gia-du-an.component';

describe('ThamGiaDuAnComponent', () => {
  let component: ThamGiaDuAnComponent;
  let fixture: ComponentFixture<ThamGiaDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThamGiaDuAnComponent]
    });
    fixture = TestBed.createComponent(ThamGiaDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
