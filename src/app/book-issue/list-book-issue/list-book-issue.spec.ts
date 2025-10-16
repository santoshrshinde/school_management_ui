import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookIssue } from './list-book-issue';

describe('ListBookIssue', () => {
  let component: ListBookIssue;
  let fixture: ComponentFixture<ListBookIssue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBookIssue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBookIssue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
