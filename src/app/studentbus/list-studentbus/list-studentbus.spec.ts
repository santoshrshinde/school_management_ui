import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentbus } from './list-studentbus';

describe('ListStudentbus', () => {
  let component: ListStudentbus;
  let fixture: ComponentFixture<ListStudentbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStudentbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudentbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
