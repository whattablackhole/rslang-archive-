import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPage } from './statistics-page.component';

describe('StatisticsPage', () => {
  let component: StatisticsPage;
  let fixture: ComponentFixture<StatisticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
