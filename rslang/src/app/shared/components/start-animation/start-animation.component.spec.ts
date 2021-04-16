import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAnimation } from './start-animation.component';

describe('StartAnimation', () => {
  let component: StartAnimation;
  let fixture: ComponentFixture<StartAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartAnimation],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
