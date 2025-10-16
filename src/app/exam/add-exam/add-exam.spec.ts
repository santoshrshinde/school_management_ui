import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExam } from './add-exam';

describe('AddExam', () => {
  let component: AddExam;
  let fixture: ComponentFixture<AddExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
