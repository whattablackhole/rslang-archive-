import { TestBed } from '@angular/core/testing';

import { GamesAggregationService } from './games-aggregation.service';

describe('GamesAggregationService', () => {
  let service: GamesAggregationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesAggregationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
