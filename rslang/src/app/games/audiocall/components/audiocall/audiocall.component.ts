import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { Statistics } from 'src/app/shared/models/statistics-short.model';
import { GameCoreService } from '../../../services/game-core.service';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { WORDS_API_URL } from '../../../../shared/constants/constants';
import { UserWordsDataService } from '../../../../shared/services/user-words-data.service';
import { BlockPositionState } from '../types/block-position-state.type';
import { GameStorageWordsService } from '../../../services/game-storage-words.service';
import { GameUserWordsService } from '../../../services/game-user-words.service';
import { WordDataService } from '../../../../shared/services/word-data.service';
import { GameWordsService } from '../../../services/game-words.service';
import { gameWordsFactory } from '../../../services/game-words.factory';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.scss'],
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
    },
  ],
  animations: [
    trigger('blockPosition', [
      state('right', style({ transform: 'translateX(600px)', offset: '1' })),
      transition('* => right', [
        animate(
          '1s',
          keyframes([
            style({ transform: 'translateX(30px)', offset: '0.7' }),
            style([{ transform: 'translateX(-900px)', offset: '1' }]),
          ]),
        ),
      ]),
      state('center', style({ transform: 'translateX(0px)', offset: '1' })),
      transition('* => center', [
        animate(
          '0.2s',
          keyframes([style([{ transform: 'translateX(0px)', offset: '1' }])]),
        ),
      ]),
    ]),
  ],
})
export class Audiocall implements OnInit {
  sortedWords: WordWithStatistics[];
  wordsFromLocalStorage: WordWithStatistics[] | null | string;

  gameResultWords: GameResults = { correctWords: [], incorrectWords: [] };
  statistics: Statistics;

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 25,
    wordsLength: 0,
    minAmout: 5,
  };

  isGameFinished = false;
  isAnswered = false;

  currentIndex = 0;
  currentStreak = 0;
  correctGamePercent = 0;
  biggestStreak = 0;

  blockPosition: BlockPositionState;

  page = '0';
  group = '0';
  answerButtonText = "Don't know";
  correctWordName: string;
  incorrectWordName: string;
  choosedWordName: string;

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
        this.sortedWords = sortedWords;
      },
    );
  }

  onAnswer(item: WordWithStatistics): void {
    this.choosedWordName = item.word;
    this.isAnswered = true;
    this.answerButtonText = 'Next Word';

    const result = this.checkIfAsnwerCorrect(item);

    if (result) {
      this.onRightAnswer();
    } else {
      this.onWrongAnswer();
    }
  }

  onAnswerEndEvent(event: AnimationEvent): void {
    if (!event.toState) {
      this.gameCoreService.playAudio(`${WORDS_API_URL}/${this.sortedWords[this.currentIndex].audio}`);
    }
    if (event.toState === 'right') {
      this.checkIfGameFinished();

      if (!this.isGameFinished) {
        this.updateGameState();
      }
    }
  }

  onFinishAnswer(): void {
    if (!this.choosedWordName) {
      this.onWrongAnswer();
    }
    this.blockPosition = 'right';
  }

  onPlaySound(): void {
    this.gameCoreService.playAudio(
      `${WORDS_API_URL}/${this.sortedWords[this.currentIndex].audio}`,
    );
  }

  onRightAnswer(): void {
    this.correctWordName = this.sortedWords[this.currentIndex].word;
    this.changeWordsKnowledgeDegree(
      this.sortedWords[this.currentIndex].id,
      true,
    );
    this.calculateStreak(true);
    this.addWordToCorrect(this.sortedWords[this.currentIndex]);
  }

  onWrongAnswer(): void {
    this.incorrectWordName = this.sortedWords[this.currentIndex].word;
    this.changeWordsKnowledgeDegree(
      this.sortedWords[this.currentIndex].id,
      false,
    );
    this.calculateStreak(false);
    this.addWordToIncorrect(this.sortedWords[this.currentIndex]);
  }

  updateGameState(): void {
    this.currentIndex += 1;
    this.gameCoreService.playAudio(
      `${WORDS_API_URL}/${this.sortedWords[this.currentIndex].audio}`,
    );
    this.isAnswered = false;
    this.correctWordName = '';
    this.incorrectWordName = '';
    this.choosedWordName = '';
    this.answerButtonText = "Don't know";
    this.blockPosition = 'center';
  }

  finishGame(): void {
    this.generateCorrectPercent();
    this.isGameFinished = true;
    this.statistics = this.gameCoreService.generateStats(
      this.gameResultWords,
      this.biggestStreak,
      'AudioCall',
    );
    this.gameWordsService.uploadWords(this.sortedWords);
    this.gameWordsService.uploadStats(this.statistics);
  }

  checkIfGameFinished(): void {
    if (
      this.currentIndex + 1
      === this.gameWordsState.wordsLength - this.gameWordsState.minAmout
    ) {
      this.finishGame();
    }
  }

  checkIfAsnwerCorrect(item: WordWithStatistics): boolean {
    return this.sortedWords[this.currentIndex].word === item.word;
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correctWords.length;
    const incorrectNumber: number = this.gameResultWords.incorrectWords.length;
    this.correctGamePercent = Math.floor(
      (correctNumber * 100) / (incorrectNumber + correctNumber),
    );
  }

  addWordToCorrect(word: WordWithStatistics): void {
    this.gameResultWords.correctWords.push(word);
  }

  addWordToIncorrect(word: WordWithStatistics): void {
    this.gameResultWords.incorrectWords.push(word);
  }

  calculateStreak(answer: boolean): void {
    if (answer) {
      this.currentStreak += 1;
      this.biggestStreak = Math.max(this.currentStreak, this.biggestStreak);
    } else {
      this.biggestStreak = Math.max(this.currentStreak, this.biggestStreak);
      this.currentStreak = 0;
    }
  }

  changeWordsKnowledgeDegree(id: string, result: boolean): void {
    const index = this.sortedWords.findIndex((item) => item.id === id);
    if (result) {
      this.sortedWords[index].userStats.optional.knowledgeDegree = this.sortedWords[index]
        .userStats.optional.knowledgeDegree as number + 1;
    } else if (this.sortedWords[index].userStats.optional.knowledgeDegree as number > 0) {
      this.sortedWords[index].userStats.optional.knowledgeDegree = this.sortedWords[index]
        .userStats.optional.knowledgeDegree as number - 1;
    }
  }
}
