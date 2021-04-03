import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main } from './main';

describe('MainPage', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Main],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
