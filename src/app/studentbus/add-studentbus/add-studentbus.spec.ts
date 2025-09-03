import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentbus } from './add-studentbus';

describe('AddStudentbus', () => {
  let component: AddStudentbus;
  let fixture: ComponentFixture<AddStudentbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStudentbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
