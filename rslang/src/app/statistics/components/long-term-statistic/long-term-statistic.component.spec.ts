import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermStatistic } from './long-term-statistic.component';

describe('LongTermStatisticComponent', () => {
  let component: LongTermStatistic;
  let fixture: ComponentFixture<LongTermStatistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTermStatistic],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermStatistic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
