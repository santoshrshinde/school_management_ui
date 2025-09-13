import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fees } from './fees';

describe('Fees', () => {
  let component: Fees;
  let fixture: ComponentFixture<Fees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
