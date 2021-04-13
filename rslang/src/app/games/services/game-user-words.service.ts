import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { UserStats } from 'src/app/shared/models/word-stats.model';
import { HttpAction } from 'src/app/shared/types/http-action.type';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { UserWord } from 'src/app/shared/models/user-word.model';
import { GameWordsState } from '../interfaces/game-words-state.model';
import { WordsDataService } from '../../shared/services/words-data.service';
import { UserAggregatedWordsService } from '../../shared/services/user-words-data.service';
import { GameCoreService } from './game-core.service';

@Injectable()
export class GameUserWordsService {
  words$: Observable<Word[]>;
  userWords$: Observable<UserWord[]>;
  sortedWordsSubject: Subject<WordWithStatistics[]>;
  sortedWords$: Observable<WordWithStatistics[]>;
  sortedWords: WordWithStatistics[];

  page: string;
  group: string;
  userID: string;
  constructor(
    private gameCoreService: GameCoreService,
    private userWordsService: UserAggregatedWordsService,
    private wordsService: WordsDataService,
    private authService: AuthService,
    private wordActionService: WordActionService,
    private statisticsActionService: StatisticsActionService,
  ) {
    this.words$ = this.wordsService.data$;
    this.userWords$ = this.userWordsService.data$;
    this.sortedWordsSubject = new Subject<WordWithStatistics[]>();
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

  createWords(
    group: string,
    page: string,
    gameWordsState: GameWordsState,
  ): void {
    const wordsState: GameWordsState = gameWordsState;

    this.page = page;
    this.group = group;
    combineLatest([this.words$, this.userWords$]).subscribe(
      (res: (Word[] | UserWord[])[]) => {
        if (!this.sortedWords) {
          this.sortedWords = this.gameCoreService.toWordsWithStatistics(res[0] as Word[]);
        } else {
          this.sortedWords = [
            ...this.sortedWords,
            ...this.gameCoreService.toWordsWithStatistics(res[0] as Word[]),
          ];
        }
        this.sortedWords = this.gameCoreService.addToSortedWords(
          this.sortedWords,
          this.gameCoreService.filterWordsByPage(res[1] as UserWord[], this.group, this.page),
        );
        this.getFullWords(wordsState);
        if (this.sortedWords.length >= wordsState.wordsLimit) {
          this.sortedWords = this.sortedWords.slice(0, wordsState.wordsLimit);
          wordsState.wordsLength = this.sortedWords.length;
          this.sortedWordsSubject.next(this.sortedWords);
        } else if (wordsState.isWordsLast) {
          wordsState.wordsLength = this.sortedWords.length;
          this.sortedWordsSubject.next(this.sortedWords);
        }
      },
    );
  }

  getWords(group: string, page: string): void {
    this.wordsService.getData(this.gameCoreService.getWordsPath(group, page));
    this.userWordsService.getData(
      this.gameCoreService.getUserWordsPath(this.userID),
    );
  }

  uploadWords(words: WordWithStatistics[]): void {
    words.forEach((word: WordWithStatistics) => {
      let action: HttpAction = 'POST';
      let body: UserStats = {
        difficulty: word.userStats.difficulty,
        optional: {
          knowledgeDegree: word.userStats.optional.knowledgeDegree,
          page: word.page.toString(),
          group: word.group.toString(),
          toStudy: {},
        },
      };
      if (word.userStats.optional.group !== 'unset') {
        action = 'PUT';
        body = {
          difficulty: word.userStats.difficulty,
          optional: { ...word.userStats.optional },
        };
      }
      this.wordActionService.sendAction(
        action,
        `${BASE_URL}/users/${this.userID}/words/${word.id}`,
        {
          onError: (err: HttpErrorResponse) => {
            console.log(err);
          },
        },
        { body },
      );
    });
  }

  uploadStats(stats: Statistics): void {
    this.statisticsActionService.sendAction(
      'PUT',
      `${BASE_URL}/users/${this.userID}/statistics`,
      {
        onError: (err) => {
          console.log(err);
        },
      },
      {
        body: { optional: { ...stats } },
      },
    );
  }
}
