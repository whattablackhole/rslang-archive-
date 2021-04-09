import { Component, OnInit } from '@angular/core';
import {
  trigger, style, animate, transition, keyframes, animation,
} from '@angular/animations';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { UserAggregatedWordsService } from '../../../../shared/services/user-words-data.service';
import { WordWithStatistics } from '../../../../shared/models/word-statistics.model';
import { GameCoreService } from '../../../services/game-core.service';
import { Statistics } from '../../../../shared/models/statistics.model';
import { GameResults } from '../../../../shared/models/game-results.model';
import { BorderColorAnimationState } from '../../types/border-color.type';
import { HiddenTextAnimationState } from '../../types/hidden-text.type';
import { GameStorageWordsService } from '../../../services/game-storage-words.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [WordsDataService, UserAggregatedWordsService, GameStorageWordsService],
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
  word: WordWithStatistics;

  gameResultWords: GameResults = { correct_words: [], incorrect_words: [] };
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

  gameWordsState: GameWordsState = {
    isWordsLast: false,
    isNoWords: false,
    wordsLimit: 20,
    wordsLength: 0,
    minAmout: 5,
  };

  isGameStarted = false;
  isGameFinished = false;

  group: string;
  page: string;

  constructor(
    private gameCoreService: GameCoreService,
    private router: Router,
    private gameStorageWordsService: GameStorageWordsService,
  ) {
    this.router.events
      .pipe(
        filter((events: any) => events instanceof RoutesRecognized),
        pairwise(),
      )
      .subscribe((events: RoutesRecognized[]) => {
        if (events[0].url.startsWith('/ebook')) {
          this.page = events[0].state.root.queryParams.page as string;
          this.group = events[0].state.root.queryParams.group as string;
        } else {
          this.page = '1';
          this.group = '1';
        }
      });
  }

  ngOnInit(): void {
    if (!this.page && !this.group) {
      this.group = '1';
      this.page = '1';
    }
    this.gameStorageWordsService.getWords(this.group, this.page);
    this.gameStorageWordsService.createWords(this.group, this.page, this.gameWordsState);
    this.gameStorageWordsService.sortedWords$.subscribe((sortedWords: WordWithStatistics[]) => {
      this.sortedWords = sortedWords;
      this.randomSortedWords = this.generateRandomWords(this.sortedWords);
    });
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
    this.statistics = this.gameCoreService.generateStats(this.gameResultWords, this.biggestStreak, 'Sprint');
    this.gameCoreService.addStatsToLocalStorage(this.statistics);
    this.generateCorrectPercent();
    this.isGameStarted = false;
    this.isGameFinished = true;
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correct_words.length;
    const incorrectNumber: number = this.gameResultWords.incorrect_words.length;
    this.correctGamePercent = Math.floor((correctNumber * 100) / (incorrectNumber + correctNumber));
  }

  checkIfGameFinished(): void {
    if (this.currentWordIndex > this.randomSortedWords.length - 1) {
      this.finishGame();
    }
  }

  generateNextWord(): void {
    this.word = this.randomSortedWords[this.currentWordIndex];
    this.currentWordIndex += 1;
  }

  findCorrectWord(): WordWithStatistics | undefined {
    return this.sortedWords.find((item) => item.id === this.word.id);
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
    this.gameResultWords.correct_words.push(word);
  }

  addWordToIncorrect(word: WordWithStatistics): void {
    this.gameResultWords.incorrect_words.push(word);
  }

  calculateStreak(answer: boolean): void {
    if (answer) {
      this.currentStreak += 1;
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
    const resultedWord: WordWithStatistics | undefined = this.findCorrectWord();
    if (resultedWord && (resultedWord?.wordTranslate === this.word.wordTranslate) === answer) {
      this.onRightAnswer(resultedWord);
    } else if (resultedWord?.wordTranslate) {
      this.onWrongAnswer(resultedWord);
    }
    this.checkIfGameFinished();
    this.generateNextWord();
  }

  changeWordsKnowledgeDegree(id: string, result: boolean): void {
    const index = this.sortedWords.findIndex((item) => item.id === id);
    if (result) {
      this.sortedWords[index].knowledgeDegree += 1;
    } else if (this.sortedWords[index].knowledgeDegree > 0) {
      this.sortedWords[index].knowledgeDegree -= 1;
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
      newItem.wordTranslate = (randomSortedWords[Math.floor(Math.random() * randomSortedWords.length)].wordTranslate);
      return newItem;
    });
    return randomSortedWords;
  }
}
