import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolbus } from './add-schoolbus';

describe('AddSchoolbus', () => {
  let component: AddSchoolbus;
  let fixture: ComponentFixture<AddSchoolbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSchoolbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchoolbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
