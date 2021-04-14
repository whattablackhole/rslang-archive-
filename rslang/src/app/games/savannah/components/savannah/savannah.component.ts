import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { Word } from 'src/app/shared/models/word.model';
import { WordsDataService } from 'src/app/shared/services/words-data.service';
import { GameCoreService } from 'src/app/games/services/game-core.service';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { GameWordsService } from 'src/app/games/services/game-words.service';
import { Groups, Pages } from 'src/app/shared/constants/constants';
import { WordDataService } from 'src/app/shared/services/word-data.service';
import { UserWordsDataService } from 'src/app/shared/services/user-words-data.service';
import { GameStorageWordsService } from 'src/app/games/services/game-storage-words.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { GameUserWordsService } from 'src/app/games/services/game-user-words.service';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { gameWordsFactory } from 'src/app/games/services/game-words.factory';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';

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
    AuthService,
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
export class Savannah implements OnInit {
  words: Word[];
  gameResultWords: GameResults = {
    correct_words: [],
    incorrect_words: [],
  };

  group = '0';
  page = '0';

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 20,
    wordsLength: 0,
    minAmout: 10,
  };

  groups: string[] = Groups;
  pages: string[] = Pages;

  correctGamePercent: number;

  isGameStart = false;
  isGameEnd = false;
  fromNavbar = true;
  questionCounter = 1;
  streak = 0;
  biggestStreak = 0;
  roundTimer = 4000;
  answersAmount = 4;
  lives: boolean[] = [true, true, true];

  unUsedWords: Word[];
  currentWord: Word;
  currentAnswers: Word[] = [];
  timer: ReturnType<typeof setTimeout>;

  fallingDownAnimationState = 'start';

  constructor(
    private gameCoreService: GameCoreService,
    private gameWordsService: GameWordsService,
  ) {}

  ngOnInit(): void {
    this.gameWordsService.getWords(this.group, this.page);
    this.gameWordsService.createWordsForGame(
      this.group,
      this.page,
      this.gameWordsState,
    );

    this.gameWordsService.sortedWords$.subscribe(
      (sortedWords: WordWithStatistics[]) => {
        this.words = sortedWords;
        this.unUsedWords = [...this.words];
      },
    );
  }

  generateRound(): void {
    this.generateQuestion();
    this.generateAnswers();
    this.currentAnswers = this.shuffleArray(this.currentAnswers);
    setTimeout(() => {
      this.fallingDownAnimationState = 'end';
    }, 0);
    this.nextRoundTimer();
  }

  onKeyDownHandler(e: KeyboardEvent): void {
    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
      this.checkAnswer(this.currentAnswers[+e.key - 1]);
    }
  }

  startGame(): void {
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

  checkAnswer(answer: Word): void {
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
      const answer: Word = this.words[this.randomNumber(0, this.words.length)];
      if (!this.currentAnswers.some((a: Word) => a.id === answer.id)) {
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

  makeWordAggregated(word: Word): WordWithStatistics {
    return {
      ...word,
      userStats: {
        difficulty: 'hard',
        optional: {
          toStudy: {},
          knowledgeDegree: 0,
          page: 'unset',
          group: 'unset',
        },
      },
    };
  }

  changeWordKnowledge(
    word: WordWithStatistics,
    result: boolean,
  ): WordWithStatistics {
    const changedWord = { ...word };
    if (result) {
      changedWord.userStats.optional.knowledgeDegree = (changedWord.userStats.optional.knowledgeDegree as number) + 1;
    } else if ((changedWord.userStats.optional.knowledgeDegree as number) > 0) {
      changedWord.userStats.optional.knowledgeDegree = (changedWord.userStats.optional.knowledgeDegree as number) + 1;
    }

    return changedWord;
  }

  onWrongAnswer(currentWord: Word): void {
    this.lives.splice(0, 1);
    this.currentAnswers.length = 0;
    const aggregatedWord = this.makeWordAggregated(currentWord);
    this.gameResultWords.incorrect_words.push(
      this.changeWordKnowledge(aggregatedWord, false),
    );
  }

  onCorrectAnswer(currentWord: Word): void {
    this.streak += 1;
    this.currentAnswers.length = 0;
    const aggregatedWord = this.makeWordAggregated(currentWord);
    this.gameResultWords.correct_words.push(
      this.changeWordKnowledge(aggregatedWord, true),
    );
  }

  onGameEnd(): void {
    this.isGameStart = false;
    this.isGameEnd = true;
    this.calculateStreak();
    this.generateCorrectPercent();
    const statistics = this.gameCoreService.generateStats(
      this.gameResultWords,
      this.biggestStreak,
      'Savannah',
    );
    this.gameWordsService.uploadWords([
      ...this.gameResultWords.correct_words,
      ...this.gameResultWords.incorrect_words,
    ]);
    this.gameWordsService.uploadStats(statistics);
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correct_words.length;
    const incorrectNumber: number = this.gameResultWords.incorrect_words.length;
    this.correctGamePercent = Math.floor(
      (correctNumber * 100) / (incorrectNumber + correctNumber),
    );
  }

  shuffleArray(arrToShuffle: Word[]): Word[] {
    const arr = [...arrToShuffle];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }
}
