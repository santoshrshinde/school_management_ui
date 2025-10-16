import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimetable } from './add-timetable';

describe('AddTimetable', () => {
  let component: AddTimetable;
  let fixture: ComponentFixture<AddTimetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimetable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
