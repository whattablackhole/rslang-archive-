import { TestBed } from '@angular/core/testing';

import { GameStorageWordsService } from './game-storage-words.service';

describe('GameStorageWordsService', () => {
  let service: GameStorageWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStorageWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
