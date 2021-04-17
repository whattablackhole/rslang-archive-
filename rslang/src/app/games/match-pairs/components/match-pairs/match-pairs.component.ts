import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { GameCoreService } from 'src/app/games/services/game-core.service';
import { GameStorageWordsService } from 'src/app/games/services/game-storage-words.service';
import { GameUserWordsService } from 'src/app/games/services/game-user-words.service';
import { gameWordsFactory } from 'src/app/games/services/game-words.factory';
import { GameWordsService } from 'src/app/games/services/game-words.service';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { UserWordsDataService } from 'src/app/shared/services/user-words-data.service';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { WordDataService } from 'src/app/shared/services/word-data.service';
import { WordsDataService } from 'src/app/shared/services/words-data.service';

@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss'],
  providers: [
    GameCoreService,
    WordDataService,
    UserWordsDataService,
    WordsDataService,
    GameStorageWordsService,
    GameUserWordsService,
    StatisticsActionService,
    WordActionService,
    {
      provide: GameWordsService,
      useFactory: gameWordsFactory,
      deps: [
        WordsDataService,
        GameCoreService,
        AuthService,
        UserWordsDataService,
        WordActionService,
        StatisticsActionService,
      ],
    },
  ],
})
export class MatchPairs implements OnInit {
  sortedWords: WordWithStatistics[];

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 25,
    wordsLength: 0,
    minAmout: 20,
  };

  isGameStart = false;
  isGameEnd = false;

  currentIndex = 0;
  lastIndex: number;
  groupsAmount = 6;
  pagesAmount = 30;

  page = '0';
  group = '0';

  constructor(
    private gameWordsService: GameWordsService,
  ) { }

  ngOnInit(): void {
    this.gameWordsService.sortedWords$.pipe((first())).subscribe((sortedWords) => {
      this.sortedWords = sortedWords;
      this.lastIndex = this.calculateLastIndex(this.gameWordsState);
    });
  }

  onChooseGroup(group: string): void {
    this.group = group;
  }

  onChoosePage(page: string): void {
    this.page = page;
  }

  getWords(): void {
    this.isGameStart = true;
    this.gameWordsService.getWords(this.group, this.page);
    this.gameWordsService.createWordsForGame(
      this.group,
      this.page,
      this.gameWordsState,
    );
  }

  calculateLastIndex(gameWordsState: GameWordsState): number {
    return (gameWordsState.wordsLength - 1) - gameWordsState.minAmout;
  }
}
