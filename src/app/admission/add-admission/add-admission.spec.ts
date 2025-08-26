import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmission } from './add-admission';

describe('AddAdmission', () => {
  let component: AddAdmission;
  let fixture: ComponentFixture<AddAdmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
