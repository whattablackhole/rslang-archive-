import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Settings } from './settings.component';

describe('Settings', () => {
  let component: Settings;
  let fixture: ComponentFixture<Settings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Settings],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
