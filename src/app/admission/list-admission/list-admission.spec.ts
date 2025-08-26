import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdmission } from './list-admission';

describe('ListAdmission', () => {
  let component: ListAdmission;
  let fixture: ComponentFixture<ListAdmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAdmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
