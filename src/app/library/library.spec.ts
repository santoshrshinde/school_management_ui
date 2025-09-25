import { ComponentFixture, TestBed } from '@angular/core/testing';

import { library } from './library';

describe('library', () => {
  let component: library;
  let fixture: ComponentFixture<library>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [library]
    })
    .compileComponents();

    fixture = TestBed.createComponent(library);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
