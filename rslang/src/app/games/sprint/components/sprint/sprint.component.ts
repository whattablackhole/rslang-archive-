import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, keyframes, animation } from '@angular/animations';
import { Word } from 'src/app/shared/models/word.model';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { BASE_URL } from '../../../../shared/constants/base-url';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { UserAggregatedWordsService } from '../../../../shared/services/user-words-data.service';
import { WordWithStatistics } from '../../../../shared/models/word-statistics.model';
import { GameCoreService } from '../../../services/game-core.service';
import { Statistics } from '../../../../shared/models/statistics.model';
import { GameResults } from '../../../../shared/models/game-results.model';
import { BorderColorAnimationState } from '../../types/border-color.type';
import { HiddenTextAnimationState } from '../../types/hidden-text.type';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  providers: [WordsDataService, UserAggregatedWordsService],
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
  words: Observable<Word[]>;
  randomSortedWords: WordWithStatistics[];
  wordsFromLocalStorage: WordWithStatistics[] | string | null;
  sortedWords: WordWithStatistics[];
  word: WordWithStatistics;

  gameResultWords: GameResults;
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
  wordsLimit = 20;

  isGameStarted = false;
  isGameFinished = false;

  group: string;
  page: string;

  constructor(
    private wordsDataService: WordsDataService,
    private userAggregatedWordsService: UserAggregatedWordsService,
    private gameCoreService: GameCoreService,
    private router: Router,
  ) {
    this.words = this.wordsDataService.data$;
    this.sortedWords = [];
    this.gameResultWords = { correct_words: [], incorrect_words: [] };
    this.router.events
      .pipe(
        // eslint-disable-next-line
        filter((events: any) => events instanceof RoutesRecognized),
        pairwise(),
      )
      .subscribe((events: RoutesRecognized[]) => {
        if (events[0].url.startsWith('/ebook')) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.page = events[0].state.root.queryParams.page;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.group = events[0].state.root.queryParams.group;
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
    this.getFullWords(this.group, this.page);
    this.generateWordsForGame();
  }

  onBorderDone(): void {
    this.borderColorAnimationState = 'none';
  }

  getPath = (group: string, page: string): string => `${BASE_URL}/words?group=${group}&page=${page}`;

  getUserPath = (group: string, page: string, id: string): string => `${BASE_URL}/users/${id}/aggregatedWords`;

  getAggregatedWords(group: string, page: string, id: string): void {
    this.userAggregatedWordsService.getData(this.getUserPath(group, page, id));
  }

  getWords(group: string, page: string): void {
    this.wordsDataService.getData(this.getPath(group, page));
    this.wordsFromLocalStorage = this.gameCoreService.getLocalStorageWords(group, page);
  }

  toAggregatedWords(words: Word[]): WordWithStatistics[] {
    return words.map((elem) => ({
      ...elem,
      isRemove: false,
      isDifficult: false,
      toStudy: {},
      knowledgeDegree: 0,
    }));
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
    this.statistics = this.gameCoreService.generateStats(this.gameResultWords, this.biggestStreak);
    this.generateCorrectPercent();
    this.gameCoreService.addWordsToLocalStorage(this.sortedWords);
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
            this.scorePointsLimit = 40;
            this.gameLevel = 2;

            break;
          case 7:
          case 8:
          case 9:
            this.scorePointsLimit = 80;
            this.gameLevel = 3;

            break;
          case 10:
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

  getFullWords(group: string, page: string, id?: string): void {
    this.getWords(group, page);
    setTimeout(() => {
      if (this.sortedWords.length < this.wordsLimit) {
        if (parseInt(page, 10) > 0) {
          this.getFullWords(group, this.gameCoreService.decreasePageNumber(page), id);
        }
      }
    }, 2000);
  }

  generateRandomWords(sortedWords: WordWithStatistics[]): WordWithStatistics[] {
    let randomSortedWords: WordWithStatistics[] = [];
    sortedWords.forEach((val) => randomSortedWords.push({ ...val }));
    randomSortedWords = randomSortedWords.map((item) => {
      if (Math.random() > 0.5) {
        return item;
      }
      // eslint-disable-next-line
      item.wordTranslate = randomSortedWords[Math.floor(Math.random() * randomSortedWords.length)].wordTranslate;
      return item;
    });
    return randomSortedWords;
  }

  generateWordsForGame(): void {
    this.words.subscribe((words: Word[]) => {
      this.sortedWords = [...this.sortedWords, ...this.toAggregatedWords(words)];
      if (Array.isArray(this.wordsFromLocalStorage)) {
        this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, this.wordsFromLocalStorage);
      }
      if (this.sortedWords.length > this.wordsLimit) {
        this.sortedWords = this.sortedWords.slice(0, this.wordsLimit);
      }
      this.randomSortedWords = this.generateRandomWords(this.sortedWords);
    });
  }
}
