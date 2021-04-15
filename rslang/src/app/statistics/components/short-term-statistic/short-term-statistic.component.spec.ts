import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTermStatistic } from './short-term-statistic.component';

describe('ShortTermStatisticComponent', () => {
  let component: ShortTermStatistic;
  let fixture: ComponentFixture<ShortTermStatistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortTermStatistic],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTermStatistic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
