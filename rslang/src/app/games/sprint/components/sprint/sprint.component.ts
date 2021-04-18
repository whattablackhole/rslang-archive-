import { Component, OnInit } from '@angular/core';
import {
  trigger, style, animate, transition, keyframes, animation,
} from '@angular/animations';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { Statistics } from 'src/app/shared/models/statistics-short.model';
import { gameWordsFactory } from 'src/app/games/services/game-words.factory';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { WordActionService } from 'src/app/shared/services/word-action.service';
import { first } from 'rxjs/operators';
import { CountdownEvent } from 'ngx-countdown';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StatisticsDataService } from 'src/app/shared/services/statistics-data.service';
import { Subscription } from 'rxjs';
import { EventStartGame } from 'src/app/ebook/models/event-start-game.model';
import { EbookProviderService } from 'src/app/ebook/services/ebook-provider.service';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { UserWordsDataService } from '../../../../shared/services/user-words-data.service';
import { WordWithStatistics } from '../../../../shared/models/word-statistics.model';
import { GameCoreService } from '../../../services/game-core.service';
import { GameResults } from '../../../../shared/models/game-results.model';
import { BorderColorAnimationState } from '../../types/border-color.type';
import { HiddenTextAnimationState } from '../../types/hidden-text.type';
import { GameStorageWordsService } from '../../../services/game-storage-words.service';
import { CountDownOptions } from '../../../interfaces/countdown.model';
import { GameWordsService } from '../../../services/game-words.service';
@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [
    WordsDataService,
    UserWordsDataService,
    GameStorageWordsService,
    GameCoreService,
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
    },
  ],
  animations: [
    trigger('coloredBorder', [
      transition(
        '* => incorrect',
        animation([
          animate(
            '0.5s',
            keyframes([
              style({ border: '2px solid white', offset: 0 }),
              style({ border: '2px solid red', offset: 0.5 }),
              style({ border: '2px solid white', offset: 1 }),
            ]),
          ),
        ]),
      ),
      transition(
        '* => correct',
        animation([
          animate(
            '0.5s',
            keyframes([
              style({ border: '2px solid white', offset: 0 }),
              style({ border: '2px solid green', offset: 0.5 }),
              style({ border: '2px solid white', offset: 1 }),
            ]),
          ),
        ]),
      ),
    ]),
  ],
})
export class Sprint implements OnInit {
  randomSortedWords: WordWithStatistics[];
  sortedWords: WordWithStatistics[];
  currentWord: WordWithStatistics;

  gameResultWords: GameResults = { correctWords: [], incorrectWords: [] };
  statistics: Statistics;

  borderColorAnimationState: BorderColorAnimationState;
  hiddenTextAnimationState: HiddenTextAnimationState;
  currentWordIndex = 0;
  biggestStreak = 0;
  currentStreak = 0;
  scorePointsLimit = 20;
  scorePoints = 0;
  gameLevel = 1;
  correctGamePercent = 0;

  groupsAmount = 6;
  pagesAmount = 30;

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 20,
    wordsLength: 0,
    minAmout: 5,
  };

  countDownOptions: CountDownOptions = {
    leftTime: 65,
    format: 'ss.S',
  };

  isGameStarted = false;
  isGameFinished = false;
  isChoosed = false;
  isGameFromBook = false;

  group = '0';
  page = '0';

  constructor(
    private gameCoreService: GameCoreService,
    private gameWordsService: GameWordsService,
    private ebookProviderService: EbookProviderService,
  ) {

  }

  ngOnInit(): void {
    this.gameWordsService.sortedWords$.pipe((first())).subscribe((sortedWords) => {
      this.sortedWords = sortedWords;
      this.randomSortedWords = this.generateRandomWords(this.sortedWords);
    });
    this.ebookProviderService.eventStartGame$.pipe(first())
      .subscribe(
        (eventStartGame: EventStartGame) => {
          if (eventStartGame.fromEbook && eventStartGame.currentState) {
            const { page, group } = eventStartGame.currentState;
            this.page = `${page}`;
            this.group = `${group}`;
            this.onChooseSubmit();
          }
        },
      );
  }

  onChooseGroup(group: string): void {
    this.group = group;
  }

  onChoosePage(page: string): void {
    this.page = page;
  }

  onChooseSubmit():void {
    this.isChoosed = true;
    this.gameWordsService.getWords(this.group, this.page);
    this.gameWordsService.createWordsForGame(
      this.group,
      this.page,
      this.gameWordsState,
    );
  }

  onTimeUp(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.autoFinishGame();
    }
  }

  autoFinishGame():void {
    this.currentWordIndex -= 1;
    while (!this.isGameFinished) {
      this.addWordToIncorrect(this.sortedWords[this.currentWordIndex]);
      this.changeWordsKnowledgeDegree(
        this.sortedWords[this.currentWordIndex].id, false,
      );
      this.currentWordIndex += 1;
      this.checkIfGameFinished();
    }
  }

  onBorderDone(): void {
    this.borderColorAnimationState = 'none';
  }

  onStartGame(): void {
    this.correctGamePercent = 0;
    this.scorePoints = 0;
    this.isGameStarted = true;
    this.isGameFinished = false;
    this.gameLevel = 1;
    this.scorePointsLimit = 20;
    this.currentStreak = 0;
    this.biggestStreak = 0;
    this.currentWordIndex = 0;
    this.hiddenTextAnimationState = 'off';
    this.generateNextWord();
  }

  finishGame(): void {
    this.sortedWords = this.gameCoreService.addStudyStats(this.sortedWords, this.gameResultWords);
    this.statistics = this.gameCoreService.generateStats(
      this.gameResultWords,
      this.biggestStreak,
      'Sprint',
    );
    this.generateCorrectPercent();
    this.isGameStarted = false;
    this.isGameFinished = true;
    this.gameWordsService.uploadStats(this.statistics);
    this.gameWordsService.uploadWords(this.sortedWords);
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correctWords.length;
    const incorrectNumber: number = this.gameResultWords.incorrectWords.length;
    this.correctGamePercent = Math.floor(
      (correctNumber * 100) / (incorrectNumber + correctNumber),
    );
  }

  checkIfGameFinished(): void {
    if (this.currentWordIndex > this.randomSortedWords.length - 1) {
      this.finishGame();
    }
  }

  generateNextWord(): void {
    this.currentWord = this.randomSortedWords[this.currentWordIndex];
    this.currentWordIndex += 1;
  }

  findCorrectWord(): WordWithStatistics | undefined {
    return this.sortedWords.find((item) => item.id === this.currentWord.id);
  }

  changeScorePointLimit(answer: boolean): void {
    if (answer) {
      if (this.scorePointsLimit < 100) {
        switch (this.currentStreak) {
          case 1:
          case 2:
          case 3:
            this.scorePointsLimit = 20;
            this.gameLevel = 1;
            break;
          case 4:
          case 5:
          case 6:
          case 7:
            this.scorePointsLimit = 40;
            this.gameLevel = 2;
            break;
          case 8:
          case 9:
          case 10:
          case 11:
            this.scorePointsLimit = 80;
            this.gameLevel = 3;
            break;
          case 12:
          case 13:
          case 14:
            this.scorePointsLimit = 100;
            this.gameLevel = 4;
            break;
          default:
            this.scorePointsLimit = 20;
        }
      }
    } else {
      this.scorePointsLimit = 20;
      this.gameLevel = 1;
    }
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

  onRightAnswer(word: WordWithStatistics): void {
    this.borderColorAnimationState = 'correct';
    this.scorePoints += this.scorePointsLimit;
    this.changeWordsKnowledgeDegree(word.id, true);
    this.calculateStreak(true);
    this.changeScorePointLimit(true);
    this.addWordToCorrect(word);
  }

  onWrongAnswer(word: WordWithStatistics): void {
    this.borderColorAnimationState = 'incorrect';
    this.changeWordsKnowledgeDegree(word.id, false);
    this.calculateStreak(false);
    this.changeScorePointLimit(false);
    this.addWordToIncorrect(word);
  }

  onAnswer(answer: boolean): void {
    this.gameCoreService.playAudio('/assets/games/sprint/pew.mp3');
    const correctWord: WordWithStatistics | undefined = this.findCorrectWord();
    if (
      correctWord && (this.currentWord.wordTranslate === correctWord.wordTranslate) === answer
    ) {
      this.onRightAnswer(correctWord);
    } else if (correctWord?.wordTranslate) {
      this.onWrongAnswer(correctWord);
    }
    this.checkIfGameFinished();
    this.generateNextWord();
  }

  changeWordsKnowledgeDegree(id: string, result: boolean): void {
    const index = this.sortedWords.findIndex((item) => item.id === id);
    if (result) {
      this.sortedWords[index].userStats.optional.knowledgeDegree += 1;
    } else if (this.sortedWords[index].userStats.optional.knowledgeDegree > 0) {
      this.sortedWords[index].userStats.optional.knowledgeDegree -= 1;
    }
  }

  generateRandomWords(sortedWords: WordWithStatistics[]): WordWithStatistics[] {
    let randomSortedWords: WordWithStatistics[] = [];
    sortedWords.forEach((val) => randomSortedWords.push({ ...val }));
    randomSortedWords = randomSortedWords.map((item) => {
      const newItem = item;
      if (Math.random() > 0.5) {
        return item;
      }
      newItem.wordTranslate = randomSortedWords[
        Math.floor(Math.random() * randomSortedWords.length)
      ].wordTranslate;
      return newItem;
    });
    return randomSortedWords;
  }
}
