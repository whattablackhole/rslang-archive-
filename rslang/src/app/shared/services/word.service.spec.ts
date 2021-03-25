import { TestBed } from '@angular/core/testing';

import { GetWordService } from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
