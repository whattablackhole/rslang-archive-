import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeChanger } from './screen-size-changer.component';

describe('ScreenSizeChanger', () => {
  let component: ScreenSizeChanger;
  let fixture: ComponentFixture<ScreenSizeChanger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreenSizeChanger],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSizeChanger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
