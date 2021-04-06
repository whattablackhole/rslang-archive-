import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Savannah } from './savannah.component';

describe('Savannah', () => {
  let component: Savannah;
  let fixture: ComponentFixture<Savannah>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Savannah],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Savannah);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
