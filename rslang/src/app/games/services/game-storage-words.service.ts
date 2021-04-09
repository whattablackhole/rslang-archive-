import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { GameCoreService } from './game-core.service';
import { WordsDataService } from '../../shared/services/words-data.service';
import { GameWordsState } from '../interfaces/game-words-state.model';

@Injectable()
export class GameStorageWordsService {
  words$: Observable<Word[]>;
  wordsFromLocalStorage: string | null | WordWithStatistics[];
  sortedWords$: Observable<WordWithStatistics[]>;
  sortedWordsSubject: Subject<WordWithStatistics[]>;
  sortedWords: WordWithStatistics[];

  constructor(private gameCoreService: GameCoreService, private wordsService: WordsDataService) {
    this.words$ = this.wordsService.data$;
    this.sortedWordsSubject = new Subject<WordWithStatistics[]>();
    this.sortedWords$ = this.sortedWordsSubject.asObservable();
  }

  updateWordState(group: string, page: string, gameWordsState: GameWordsState): void {
    const wordsState: GameWordsState = gameWordsState;
    if (this.sortedWords.length < wordsState.wordsLimit) {
      if (parseInt(page, 10) > 0) {
        this.getWords(group, this.gameCoreService.decreasePageNumber(page));
      } else if (this.sortedWords.length < wordsState.minAmout) {
        wordsState.isNoWords = true;
      } else {
        wordsState.isWordsLast = true;
        wordsState.wordsLength = this.sortedWords.length;
      }
    } else {
      wordsState.wordsLength = this.sortedWords.length;
    }
  }

  createWords(group: string, page: string, gameWordsState: GameWordsState): void {
    this.words$.subscribe((words: Word[]) => {
      if (!this.sortedWords) {
        this.sortedWords = this.gameCoreService.toAggregatedWords(words);
      } else {
        this.sortedWords = [...this.sortedWords, ...this.gameCoreService.toAggregatedWords(words)];
      }
      if (Array.isArray(this.wordsFromLocalStorage)) {
        this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, this.wordsFromLocalStorage);
      }
      this.updateWordState(page, group, gameWordsState);
      if (this.sortedWords.length >= gameWordsState.wordsLimit) {
        this.sortedWords = this.sortedWords.slice(0, gameWordsState.wordsLimit);
        this.sortedWordsSubject.next(this.sortedWords);
      } else if (gameWordsState.isWordsLast) {
        this.sortedWordsSubject.next(this.sortedWords);
      }
    });
  }

  getWords(group: string, page: string): void {
    this.wordsService.getData(this.gameCoreService.getWordsPath(group, page));
    this.wordsFromLocalStorage = this.gameCoreService.getLocalStorageWords(group, page);
  }
}
