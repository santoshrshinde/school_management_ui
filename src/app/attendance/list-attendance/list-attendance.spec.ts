import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendance } from './list-attendance';

describe('ListAttendance', () => {
  let component: ListAttendance;
  let fixture: ComponentFixture<ListAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAttendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
