import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTermStatisticComponent } from './short-term-statistic.component';

describe('ShortTermStatisticComponent', () => {
  let component: ShortTermStatisticComponent;
  let fixture: ComponentFixture<ShortTermStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortTermStatisticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTermStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
