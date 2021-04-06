import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Audiocall } from './audiocall.component';

describe('Audiocall', () => {
  let component: Audiocall;
  let fixture: ComponentFixture<Audiocall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Audiocall],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Audiocall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
