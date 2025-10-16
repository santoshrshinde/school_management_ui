import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResult } from './list-result';

describe('ListResult', () => {
  let component: ListResult;
  let fixture: ComponentFixture<ListResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
