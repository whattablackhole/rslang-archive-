import { TestBed } from '@angular/core/testing';

import { StatisticsActionService } from './statistics-action.service';

describe('StatisticsActionService', () => {
  let service: StatisticsActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
