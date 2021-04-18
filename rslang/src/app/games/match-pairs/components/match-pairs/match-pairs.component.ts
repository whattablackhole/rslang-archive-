import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { GameCoreService } from 'src/app/games/services/game-core.service';
import { GameStorageWordsService } from 'src/app/games/services/game-storage-words.service';
import { GameUserWordsService } from 'src/app/games/services/game-user-words.service';
import { gameWordsFactory } from 'src/app/games/services/game-words.factory';
import { GameWordsService } from 'src/app/games/services/game-words.service';
import { GameResults } from 'src/app/shared/models/game-results.model';
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
  wordsSubscription: Subscription;
  sortedWords: WordWithStatistics[];
  selectedCards: WordWithStatistics[] = [];

  gameResultWords: GameResults = {
    correctWords: [],
    incorrectWords: [],
  };

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 20,
    wordsLength: 0,
    minAmout: 20,
  };

  isGameStart = false;
  isGameEnd = false;

  currentIndex = 0;
  groupsAmount = 6;
  pagesAmount = 30;
  streak = 0;
  biggestStreak = 0;
  pairsCounter = 1;
  correctGamePercent: number;

  group = '0';
  page = '0';

  constructor(
    private gameWordsService: GameWordsService,
    private router: ActivatedRoute,
    private gameCoreService: GameCoreService,
  ) { }

  ngOnInit(): void {
    this.wordsSubscription = this.gameWordsService.sortedWords$.subscribe(
      (sortedWords: WordWithStatistics[]) => {
        this.sortedWords = sortedWords;
        this.wordsSubscription.unsubscribe();
      },
    );
    const params = this.router.snapshot.queryParams;
    if (params.prev === 'book' && parseInt(params.group, 10) && parseInt(params.page, 10)) {
      this.page = params.page as string;
      this.group = params.group as string;
      this.getWords();
    }
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

  cardClicked(cardClicked: WordWithStatistics): void {
    if (this.selectedCards.length < 2) {
      this.selectedCards.push(cardClicked);
      if (this.selectedCards.length > 1) {
        this.checkAnswer();
      }
    } else {
      this.selectedCards.pop();
    }
  }

  checkAnswer(): void {
    const cardOne = this.selectedCards[0];
    const cardTwo = this.selectedCards[1];
    if (cardOne.id === cardTwo.id) {
      this.onCorrectAnswer(cardOne);
    } else {
      this.calculateStreak();
      this.onWrongAnswer(cardOne);
    }
    this.selectedCards = [];
    this.pairsCounter += 1;
    if (this.pairsCounter > this.sortedWords.length) {
      this.onGameEnd();
    }
  }

  onCorrectAnswer(answer: WordWithStatistics): void {
    this.streak += 1;
    this.gameResultWords.correctWords.push(
      this.changeWordKnowledge(answer, true),
    );
  }

  onWrongAnswer(answer: WordWithStatistics): void {
    this.gameResultWords.incorrectWords.push(
      this.changeWordKnowledge(answer, false),
    );
  }

  onGameEnd(): void {
    this.isGameEnd = true;
    const gameResultWords: WordWithStatistics[] = this.gameCoreService.addStudyStats(
      [
        ...this.gameResultWords.correctWords,
        ...this.gameResultWords.incorrectWords,
      ],
      this.gameResultWords,
    );
    this.calculateStreak();
    this.generateCorrectPercent();
    const statistics = this.gameCoreService.generateStats(
      this.gameResultWords,
      this.biggestStreak,
      'MatchPairs',
    );
    this.gameWordsService.uploadWords(gameResultWords);
    this.gameWordsService.uploadStats(statistics);
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correctWords.length;
    const incorrectNumber: number = this.gameResultWords.incorrectWords.length;
    this.correctGamePercent = Math.floor(
      (correctNumber * 100) / (incorrectNumber + correctNumber),
    );
  }

  calculateStreak(): void {
    if (this.biggestStreak < this.streak) {
      this.biggestStreak = this.streak;
      this.streak = 0;
    }
  }

  changeWordKnowledge(word: WordWithStatistics, result: boolean): WordWithStatistics {
    const changedWord = { ...word };
    if (result) {
      changedWord.userStats.optional.knowledgeDegree += 1;
    } else if (changedWord.userStats.optional.knowledgeDegree > 0) {
      changedWord.userStats.optional.knowledgeDegree -= 1;
    }
    return changedWord;
  }
}
