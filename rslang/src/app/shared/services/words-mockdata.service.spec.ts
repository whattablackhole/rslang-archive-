import { TestBed } from '@angular/core/testing';

import { WordsMockDataService } from './words-mockdata.service';

describe('WordsDataService', () => {
  let service: WordsMockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsMockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
