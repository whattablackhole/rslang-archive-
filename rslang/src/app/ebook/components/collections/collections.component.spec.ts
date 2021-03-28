import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collections } from './collections.component';

describe('Collections', () => {
  let component: Collections;
  let fixture: ComponentFixture<Collections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Collections],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Collections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
