import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermStatisticComponent } from './long-term-statistic.component';

describe('LongTermStatisticComponent', () => {
  let component: LongTermStatisticComponent;
  let fixture: ComponentFixture<LongTermStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTermStatisticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
