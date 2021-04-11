import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { GameCoreService } from './game-core.service';
import { UserAggregatedWordsService } from '../../shared/services/user-words-data.service';
import { WordsDataService } from '../../shared/services/words-data.service';
import { GameWordsState } from '../interfaces/game-words-state.model';

@Injectable()
export class UserWordsService {
  words$: Observable<Word[]>;
  userWords$: Observable<WordWithStatistics[]>;
  sortedWordsSubject: Subject<WordWithStatistics[]>;
  sortedWords$: Observable<WordWithStatistics[]>;
  sortedWords: WordWithStatistics[];

  page:string;
  group:string;

  constructor(
    private gameCoreService: GameCoreService,
    private userWordsService: UserAggregatedWordsService,
    private wordsService: WordsDataService,
  ) {
    this.words$ = this.wordsService.data$;
    this.userWords$ = this.userWordsService.data$;
    this.sortedWords$ = this.sortedWordsSubject.asObservable();
  }

  getFullWords(id: string, gameWordsState: GameWordsState): void {
    const wordsState: GameWordsState = gameWordsState;
    if (this.sortedWords.length < wordsState.wordsLimit) {
      if (parseInt(this.page, 10)) {
        this.page = this.gameCoreService.decreasePageNumber(this.page);
        this.getWords(this.group, this.page, id);
      } else if (this.sortedWords.length < wordsState.minAmout) {
        wordsState.isNoWords = true;
      } else {
        wordsState.isWordsLast = true;
      }
    }
  }

  createWords(group: string, page: string, id: string, gameWordsState: GameWordsState): void {
    const wordsState: GameWordsState = gameWordsState;

    this.page = page;
    this.group = group;
    combineLatest([this.words$, this.userWords$]).subscribe((res: (Word[] | WordWithStatistics[])[]) => {
      if (!this.sortedWords) {
        this.sortedWords = this.gameCoreService.toAggregatedWords(res[0]);
      } else {
        this.sortedWords = [...this.sortedWords, ...this.gameCoreService.toAggregatedWords(res[0])];
      }
      this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, res[1] as WordWithStatistics[]);
      this.getFullWords(id, wordsState);
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

  getWords(group: string, page: string, id: string): void {
    this.wordsService.getData(this.gameCoreService.getWordsPath(group, page));
    this.userWordsService.getData(this.gameCoreService.getUserWordsPath(group, page, id));
  }
}
