import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentbus } from './studentbus';

describe('Studentbus', () => {
  let component: Studentbus;
  let fixture: ComponentFixture<Studentbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Studentbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
