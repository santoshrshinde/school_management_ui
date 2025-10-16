import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResult } from './add-result';

describe('AddResult', () => {
  let component: AddResult;
  let fixture: ComponentFixture<AddResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
