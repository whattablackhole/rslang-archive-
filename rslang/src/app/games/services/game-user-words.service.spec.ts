import { TestBed } from '@angular/core/testing';

import { GameUserWordsService } from './game-user-words.service';

describe('UserWordsService', () => {
  let service: GameUserWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUserWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
