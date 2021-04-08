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

  constructor(
    private gameCoreService: GameCoreService,
    private userWordsService: UserAggregatedWordsService,
    private wordsService: WordsDataService,
  ) {
    this.words$ = this.wordsService.data$;
    this.userWords$ = this.userWordsService.data$;
    this.sortedWords$ = this.sortedWordsSubject.asObservable();
  }

  updateWordState(group: string, page: string, id: string, gameWordsState: GameWordsState): void {
    const wordsState: GameWordsState = gameWordsState;
    if (this.sortedWords.length < wordsState.wordsLimit) {
      if (parseInt(page, 10) > 0) {
        this.getWords(group, this.gameCoreService.decreasePageNumber(page), id);
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

  createWords(wordsLimit: number, page: string, group: string, id: string, gameWordsState: GameWordsState): void {
    combineLatest([this.words$, this.userWords$]).subscribe((res: (WordWithStatistics[] | Word[])[]) => {
      this.sortedWords = [...this.sortedWords, ...this.gameCoreService.toAggregatedWords(res[0])];
      this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, res[1] as WordWithStatistics[]);
      this.updateWordState(page, group, id, gameWordsState);
      if (this.sortedWords.length >= gameWordsState.wordsLimit) {
        this.sortedWords = this.sortedWords.slice(0, gameWordsState.wordsLimit);
        this.sortedWordsSubject.next(this.sortedWords);
      } else if (gameWordsState.isWordsLast) {
        this.sortedWordsSubject.next(this.sortedWords);
      }
    });
  }

  getWords(group: string, page: string, id: string): void {
    this.wordsService.getData(this.gameCoreService.getWordsPath(group, page));
    this.userWordsService.getData(this.gameCoreService.getUserWordsPath(group, page, id));
  }
}
