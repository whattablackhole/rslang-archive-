import { TestBed } from '@angular/core/testing';

import { GetWordsDataService } from './get-words-data.service';

describe('GetWordsDataService', () => {
  let service: GetWordsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWordsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
