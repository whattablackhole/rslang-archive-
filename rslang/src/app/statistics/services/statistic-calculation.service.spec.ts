import { TestBed } from '@angular/core/testing';

import { StatisticCalculationService } from './statistic-calculation.service';

describe('StatisticCalculationService', () => {
  let service: StatisticCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
