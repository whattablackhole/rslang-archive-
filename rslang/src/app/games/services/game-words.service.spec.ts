import { TestBed } from '@angular/core/testing';

import { GameWordsService } from './game-words.service';

describe('GameWordsService', () => {
  let service: GameWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
