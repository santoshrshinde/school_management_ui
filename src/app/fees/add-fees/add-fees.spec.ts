import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFees } from './add-fees';

describe('AddFees', () => {
  let component: AddFees;
  let fixture: ComponentFixture<AddFees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
