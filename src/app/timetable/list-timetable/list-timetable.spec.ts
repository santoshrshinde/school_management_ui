import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimetable } from './list-timetable';

describe('ListTimetable', () => {
  let component: ListTimetable;
  let fixture: ComponentFixture<ListTimetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTimetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTimetable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
