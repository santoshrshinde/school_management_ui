import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdd } from './teacher-add';

describe('TeacherAdd', () => {
  let component: TeacherAdd;
  let fixture: ComponentFixture<TeacherAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
