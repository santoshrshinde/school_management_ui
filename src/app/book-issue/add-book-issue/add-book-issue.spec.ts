import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookIssue } from './add-book-issue';

describe('AddBookIssue', () => {
  let component: AddBookIssue;
  let fixture: ComponentFixture<AddBookIssue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookIssue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookIssue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
