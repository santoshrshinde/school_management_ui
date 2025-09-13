import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFees } from './list-fees';

describe('ListFees', () => {
  let component: ListFees;
  let fixture: ComponentFixture<ListFees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
