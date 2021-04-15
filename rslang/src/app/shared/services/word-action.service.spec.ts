import { TestBed } from '@angular/core/testing';

import { WordActionService } from './word-action.service';

describe('WordActionService', () => {
  let service: WordActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
