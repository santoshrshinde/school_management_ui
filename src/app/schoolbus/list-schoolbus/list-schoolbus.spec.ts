import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchoolbus } from './list-schoolbus';

describe('ListSchoolbus', () => {
  let component: ListSchoolbus;
  let fixture: ComponentFixture<ListSchoolbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSchoolbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSchoolbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
