import { TestBed } from '@angular/core/testing';

import { UsersWordsDataService } from './users-words-data.service';

describe('UsersWordsDataService', () => {
  let service: UsersWordsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersWordsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
