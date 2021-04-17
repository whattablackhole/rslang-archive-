import { Component, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { WordsDataService } from 'src/app/shared/services/words-data.service';
import { GameCoreService } from 'src/app/games/services/game-core.service';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { GameWordsService } from 'src/app/games/services/game-words.service';
import { WordDataService } from 'src/app/shared/services/word-data.service';
import { UserWordsDataService } from 'src/app/shared/services/user-words-data.service';
import { GameStorageWordsService } from 'src/app/games/services/game-storage-words.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { GameUserWordsService } from 'src/app/games/services/game-user-words.service';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { gameWordsFactory } from 'src/app/games/services/game-words.factory';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StatisticsDataService } from 'src/app/shared/services/statistics-data.service';

@Component({
  selector: 'app-savannah',
  templateUrl: './savannah.component.html',
  styleUrls: ['./savannah.component.scss'],
  providers: [
    GameCoreService,
    WordDataService,
    UserWordsDataService,
    WordsDataService,
    GameStorageWordsService,
    GameUserWordsService,
    StatisticsActionService,
    WordActionService,
    NotificationService,
    StatisticsDataService,
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
        NotificationService,
        StatisticsDataService,
      ],
    }],
  animations: [
    trigger('fallingDownAnimation', [
      state(
        'start',
        style({
          top: '0%',
        }),
      ),
      state(
        'end',
        style({
          top: '100%',
        }),
      ),
      transition('* => end', animate(4000)),
      transition('end => start', animate(0)),
    ]),
  ],
})
export class Savannah implements OnDestroy {
  wordsSubscription: Subscription;
  words: WordWithStatistics[];
  gameResultWords: GameResults = {
    correctWords: [],
    incorrectWords: [],
  };

  groupNumber = '0';
  page = '0';

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 20,
    wordsLength: 0,
    minAmout: 10,
  };

  correctGamePercent: number;

  isLoading = false;
  IsNeedGameMenu = true;
  isGameStart = false;
  isGameEnd = false;
  isShownGameSettings = true;
  questionCounter = 1;
  streak = 0;
  biggestStreak = 0;
  roundTimer = 4000;
  answersAmount = 4;
  groupsAmount = 6;
  pagesAmount = 30;
  keys: string[] = ['1', '2', '3', '4'];
  lives: boolean[] = [true, true, true];

  unUsedWords: WordWithStatistics[];
  currentWord: WordWithStatistics;
  currentAnswers: WordWithStatistics[] = [];
  timer: ReturnType<typeof setTimeout>;

  fallingDownAnimationState = 'start';

  constructor(
    private gameCoreService: GameCoreService,
    private gameWordsService: GameWordsService,
  ) {}

  ngOnDestroy():void {
    this.wordsSubscription.unsubscribe();
  }

  generateRound(): void {
    this.generateQuestion();
    this.generateAnswers();
    this.currentAnswers = this.shuffleArray(this.currentAnswers);
    setTimeout(() => {
      this.fallingDownAnimationState = 'end';
    });
    this.nextRoundTimer();
  }

  onKeyDownHandler(event: KeyboardEvent): void {
    if (this.keys.includes(event.key)) {
      this.checkAnswer(this.currentAnswers[+event.key - 1]);
    }
  }

  getWords(): void {
    this.isLoading = true;
    this.isShownGameSettings = false;
    this.gameWordsService.getWords(this.groupNumber, this.page);
    this.gameWordsService.createWordsForGame(
      this.groupNumber,
      this.page,
      this.gameWordsState,
    );

    this.wordsSubscription = this.gameWordsService.sortedWords$.subscribe(
      (sortedWords: WordWithStatistics[]) => {
        this.isLoading = false;
        this.words = sortedWords;
        this.unUsedWords = [...this.words];
      },
    );
  }

  startGame(): void {
    this.IsNeedGameMenu = false;
    this.isGameStart = true;
    this.generateRound();
  }

  nextRoundTimer(): void {
    if (this.questionCounter > this.words.length || !this.lives.length) {
      this.onGameEnd();
      return;
    }
    this.timer = setTimeout(() => {
      this.onWrongAnswer(this.currentWord);
      this.fallingDownAnimationState = 'start';
      this.generateRound();
      this.calculateStreak();
    }, this.roundTimer);
  }

  checkAnswer(answer: WordWithStatistics): void {
    if (answer.id === this.currentWord.id) {
      this.onCorrectAnswer(this.currentWord);
    } else {
      this.calculateStreak();
      this.onWrongAnswer(this.currentWord);
    }

    clearTimeout(this.timer);

    this.questionCounter += 1;
    if (this.questionCounter > this.words.length || !this.lives.length) {
      this.onGameEnd();
      return;
    }

    this.generateRound();
    this.fallingDownAnimationState = 'start';
  }

  generateQuestion(): void {
    const [question] = this.unUsedWords.splice(
      this.randomNumber(0, this.unUsedWords.length),
      1,
    );
    this.currentWord = question;
  }

  generateAnswers(): void {
    this.currentAnswers.push(this.currentWord);
    while (this.currentAnswers.length !== this.answersAmount) {
      const answer: WordWithStatistics = this.words[this.randomNumber(0, this.words.length)];
      if (!this.currentAnswers.some((a: WordWithStatistics) => a.id === answer.id)) {
        this.currentAnswers.push(answer);
      }
    }
  }

  randomNumber(min: number, max: number): number {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  }

  calculateStreak(): void {
    if (this.biggestStreak < this.streak) {
      this.biggestStreak = this.streak;
      this.streak = 0;
    }
  }

  changeWordKnowledge(
    word: WordWithStatistics,
    result: boolean,
  ): WordWithStatistics {
    const changedWord = { ...word };
    if (result) {
      changedWord.userStats.optional.knowledgeDegree += 1;
    } else if (changedWord.userStats.optional.knowledgeDegree > 0) {
      changedWord.userStats.optional.knowledgeDegree -= 1;
    }

    return changedWord;
  }

  onWrongAnswer(currentWord: WordWithStatistics): void {
    this.lives.splice(0, 1);
    this.currentAnswers.length = 0;
    this.gameResultWords.incorrectWords.push(
      this.changeWordKnowledge(currentWord, false),
    );
  }

  onCorrectAnswer(currentWord: WordWithStatistics): void {
    this.streak += 1;
    this.currentAnswers.length = 0;
    this.gameResultWords.correctWords.push(
      this.changeWordKnowledge(currentWord, true),
    );
  }

  onGameEnd(): void {
    this.isGameStart = false;
    this.isGameEnd = true;
    const gameResultWords : WordWithStatistics[] = this.gameCoreService.addStudyStats(
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
      'Savannah',
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

  groupNumberChangeHandler(groupNumber: string): void {
    this.groupNumber = groupNumber;
  }

  pageChangeHandler(page: string): void {
    this.page = page;
  }

  shuffleArray(arrToShuffle: WordWithStatistics[]): WordWithStatistics[] {
    const arr = [...arrToShuffle];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }
}
