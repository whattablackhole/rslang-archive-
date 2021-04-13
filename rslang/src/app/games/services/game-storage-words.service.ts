import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
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
  page: string;
  group: string;

  constructor(private gameCoreService: GameCoreService, private wordsService: WordsDataService) {
    this.words$ = this.wordsService.data$;
    this.sortedWordsSubject = new Subject<WordWithStatistics[]>();
    this.sortedWords$ = this.sortedWordsSubject.asObservable();
  }

  getFullWords(gameWordsState: GameWordsState): void {
    const wordsState: GameWordsState = gameWordsState;
    if (this.sortedWords.length < wordsState.wordsLimit) {
      if (parseInt(this.page, 10)) {
        this.page = this.gameCoreService.decreasePageNumber(this.page);
        this.getWords(this.group, this.page);
      } else if (this.sortedWords.length < wordsState.minAmout) {
        wordsState.isNoWords = true;
      } else {
        wordsState.isWordsLast = true;
      }
    }
  }

  createWords(group: string, page: string, gameWordsState: GameWordsState): void {
    this.page = page;
    this.group = group;

    const wordsState: GameWordsState = gameWordsState;

    this.words$.subscribe((words: Word[]) => {
      if (!this.sortedWords) {
        this.sortedWords = this.gameCoreService.toWordsWithStatistics(words);
      } else {
        this.sortedWords = [...this.sortedWords, ...this.gameCoreService.toWordsWithStatistics(words)];
      }
      if (Array.isArray(this.wordsFromLocalStorage)) {
        this.sortedWords = this.gameCoreService.addLocalToSortedWords(this.sortedWords, this.wordsFromLocalStorage);
      }
      this.getFullWords(wordsState);
      if (this.sortedWords.length >= wordsState.wordsLimit) {
        this.sortedWords = this.sortedWords.slice(0, wordsState.wordsLimit);
        wordsState.wordsLength = this.sortedWords.length;
        this.sortedWordsSubject.next(this.sortedWords);
      } else if (wordsState.isWordsLast) {
        wordsState.wordsLength = this.sortedWords.length;
        this.sortedWordsSubject.next(this.sortedWords);
      }
    });
  }

  getWords(group: string, page: string): void {
    this.wordsService.getData(this.gameCoreService.getWordsPath(group, page));
    this.wordsFromLocalStorage = this.gameCoreService.getLocalStorageWords(group, page);
  }

  uploadWords(words:WordWithStatistics[]): void {
    this.gameCoreService.addWordsToLocalStorage(words);
  }

  uploadStats(stats: Statistics): void {
    this.gameCoreService.addStatsToLocalStorage(stats);
  }
}
