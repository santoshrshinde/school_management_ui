import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Schoolbus } from './schoolbus';

describe('Schoolbus', () => {
  let component: Schoolbus;
  let fixture: ComponentFixture<Schoolbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Schoolbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Schoolbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
