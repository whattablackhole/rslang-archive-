import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserAggregatedData } from '../../shared/models/user-aggregated-data.model';
import { GameCoreService } from './game-core.service';
import { UserAggregatedWordsService } from '../../shared/services/user-words-data.service';
import { GameWordsState } from '../interfaces/game-words-state.model';
import { StatisticsActionService } from '../../shared/services/statistics-action.service';

@Injectable()
export class GameUserWordsService {
  userWords$: Observable<UserAggregatedData>;
  sortedWordsSubject: Subject<WordWithStatistics[]>;
  sortedWords$: Observable<WordWithStatistics[]>;
  sortedWords: WordWithStatistics[];

  page:string;
  group:string;
  userID: string;

  constructor(
    private gameCoreService: GameCoreService,
    private userWordsService: UserAggregatedWordsService,
    private statisticsActionService: StatisticsActionService,
    private wordActionService: WordActionService,
    private authService: AuthService,
  ) {
    this.sortedWordsSubject = new Subject<WordWithStatistics[]>();
    this.userWords$ = this.userWordsService.data$;
    this.sortedWords$ = this.sortedWordsSubject.asObservable();
    this.userID = this.authService.getUserId() as string;
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
    const wordsState: GameWordsState = gameWordsState;

    this.page = page;
    this.group = group;

    this.userWords$.subscribe((wordsData: UserAggregatedData) => {
      let words: (Word & WordWithStatistics)[] = wordsData[0].paginatedResults;
      words = words.map((word:WordWithStatistics&Word) => {
        if (word.knowledgeDegree) {
          return word;
        }
        return this.gameCoreService.toAggregatedWord(word);
      });
      if (!this.sortedWords) {
        this.sortedWords = words;
      } else {
        this.sortedWords = [...this.sortedWords, ...words];
      }

      this.sortedWords.filter((word: WordWithStatistics) => !word.isRemove && word.knowledgeDegree < 3);

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
    this.userWordsService.getData(this.gameCoreService.getUserWordsPath(group, page, this.userID, '25'));
  }

  uploadWords(words:WordWithStatistics[]): void {
    words.forEach((word:WordWithStatistics) => {
      this.wordActionService.sendAction('PUT', `${BASE_URL}/users/${this.userID}/words/${word.id}`,
        {
          onError: (err) => {
            console.log(err);
          },
        }, { body: { knowledgeDegree: word.knowledgeDegree } });
    });
  }

  uploadStats(stats: Statistics): void {
    this.statisticsActionService.sendAction('PUT', `${BASE_URL}/users/${this.userID}/statistics`, {
      onError: (err) => {
        console.log(err);
      },
    }, {
      body: { ...stats },
    });
  }
}
