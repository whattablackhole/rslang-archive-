import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from 'src/app/shared/models/statistics-short.model';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameWordsState } from '../interfaces/game-words-state.model';

@Injectable()
export class GameWordsService {
  sortedWords$: Observable<WordWithStatistics[]>;

  createWordsForGame(group: string, page: string, gameWordsState: GameWordsState):void {
    throw new Error('Method not implemented.');
  }

  getWords(group: string, page: string) {
    throw new Error('Method not implemented.');
  }

  uploadStats(statistics: Statistics) {
    throw new Error('Method not implemented.');
  }

  uploadWords(sortedWords: WordWithStatistics[]) {
    throw new Error('Method not implemented.');
  }
}
