import { animate, keyframes, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { Word } from 'src/app/shared/models/word.model';
import { Observable } from 'rxjs';
import { GameCoreService } from '../../../services/game-core.service';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { UserAggregatedWordsService } from '../../../../shared/services/user-words-data.service';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.scss'],
  providers: [WordsDataService, GameCoreService, UserAggregatedWordsService],
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
      transition('* => center', [animate('0.2s', keyframes([style([{ transform: 'translateX(0px)', offset: '1' }])]))]),
    ]),
  ],
})
export class Audiocall implements OnInit {
  sortedWords: WordWithStatistics[];
  words: Observable<Word[]>;
  userWords: Observable<WordWithStatistics[]>;
  wordsFromLocalStorage: WordWithStatistics[] | null | string;

  gameResultWords: GameResults;
  statistics: Statistics;

  isWordsLast = false;
  isGameFinished = false;
  isAnswered = false;

  wordsLength: number;
  wordsLimit = 25;
  currentIndex = 0;
  currentStreak = 0;
  correctGamePercent = 0;
  biggestStreak = 0;

  page = '4';
  group = '1';
  answerButtonText = "Don't know";
  blockPosition: string;
  correctWordName: string;
  incorrectWordName: string;
  choosedWordName: string;

  constructor(
    private gameCoreService: GameCoreService,
    private wordsDataService: WordsDataService,
    private userAggregatedWordsService: UserAggregatedWordsService,
  ) {
    this.words = this.wordsDataService.data$;
    this.userWords = this.userAggregatedWordsService.data$;
    this.gameResultWords = { correct_words: [], incorrect_words: [] };
    this.sortedWords = [];
  }

  ngOnInit(): void {
    this.generateWordsForGame();
    this.getFullWords(this.group, this.page);
  }

  getPath = (group: string, page: string): string => `${BASE_URL}/words?group=${group}&page=${page}`;

  getUserPath = (group: string, page: string, id: string): string => `${BASE_URL}/users/${id}/aggregatedWords`;

  onAnswer(item: WordWithStatistics): void {
    this.choosedWordName = item.word;
    const result = this.checkIfAsnwerCorrect(item);
    this.isAnswered = true;
    this.answerButtonText = 'Next Word';

    if (result) {
      this.onRightAnswer();
    } else {
      this.onWrongAnswer();
    }
  }

  onAnswerEndEvent(event: AnimationEvent): void {
    if (event.toState === null) {
      this.gameCoreService.playAudio(`assets/${this.sortedWords[this.currentIndex].audio}`);
    }
    if (event.toState === 'right') {
      this.checkIfGameFinished();
      if (!this.isGameFinished) {
        this.currentIndex += 1;
        this.gameCoreService.playAudio(`assets/${this.sortedWords[this.currentIndex].audio}`);
        this.isAnswered = false;
        this.correctWordName = '';
        this.incorrectWordName = '';
        this.choosedWordName = '';
        this.answerButtonText = "Don't know";
        this.blockPosition = 'center';
      }
    }
  }

  finishGame(): void {
    this.generateCorrectPercent();
    this.isGameFinished = true;
    this.statistics = this.gameCoreService.generateStats(this.gameResultWords, this.biggestStreak);
    this.gameCoreService.addWordsToLocalStorage(this.sortedWords);
  }

  checkIfGameFinished(): void {
    if (this.currentIndex === this.wordsLength - 6) {
      this.finishGame();
    }
  }

  checkIfAsnwerCorrect(item: WordWithStatistics): boolean {
    return this.sortedWords[this.currentIndex].word === item.word;
  }

  onFinishAnswer(): void {
    if (!this.choosedWordName) {
      this.onWrongAnswer();
    }
    this.blockPosition = 'right';
  }

  onPlaySound(): void {
    this.gameCoreService.playAudio(`assets/${this.sortedWords[this.currentIndex].audio}`);
  }

  getWords(group: string, page: string): void {
    this.wordsDataService.getData(this.getPath(group, page));
    // eslint-disable-next-line no-constant-condition
    if (!'userAuthservice') {
      this.userAggregatedWordsService.getData(this.getPath(group, page));
    } else {
      this.wordsFromLocalStorage = this.gameCoreService.getLocalStorageWords(group, page);
    }
  }

  getFullWords(group: string, page: string, id?: string): void {
    this.getWords(group, page);

    setTimeout(() => {
      if (this.sortedWords.length < this.wordsLimit) {
        if (parseInt(page, 10) > 0) {
          this.getFullWords(group, this.gameCoreService.decreasePageNumber(page), id);
        } else {
          this.isWordsLast = true;
          this.wordsLength = this.sortedWords.length;
        }
      } else {
        this.wordsLength = this.sortedWords.length;
      }
    }, 2000);
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

  generateWordsForGame(): void {
    this.words.subscribe((words: Word[]) => {
      this.sortedWords = [...this.sortedWords, ...this.toAggregatedWords(words)];
      // eslint-disable-next-line no-constant-condition
      if (!'userAuthservice') {
        this.userWords.subscribe((userWords: WordWithStatistics[]) => {
          this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, userWords);
          if (this.sortedWords.length > this.wordsLimit) {
            this.sortedWords = this.sortedWords.slice(0, this.wordsLimit);
          }
        });
      } else if (Array.isArray(this.wordsFromLocalStorage)) {
        this.sortedWords = this.gameCoreService.addToSortedWords(this.sortedWords, this.wordsFromLocalStorage);
      }
      if (this.sortedWords.length > this.wordsLimit) {
        this.sortedWords = this.sortedWords.slice(0, this.wordsLimit);
      }
    });
  }

  generateCorrectPercent(): void {
    const correctNumber: number = this.gameResultWords.correct_words.length;
    const incorrectNumber: number = this.gameResultWords.incorrect_words.length;
    this.correctGamePercent = Math.floor((correctNumber * 100) / (incorrectNumber + correctNumber));
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

  onRightAnswer(): void {
    this.correctWordName = this.sortedWords[this.currentIndex].word;
    this.changeWordsKnowledgeDegree(this.sortedWords[this.currentIndex].id, true);
    this.calculateStreak(true);
    this.addWordToCorrect(this.sortedWords[this.currentIndex]);
  }

  onWrongAnswer(): void {
    this.incorrectWordName = this.sortedWords[this.currentIndex].word;
    this.changeWordsKnowledgeDegree(this.sortedWords[this.currentIndex].id, false);
    this.calculateStreak(false);
    this.addWordToIncorrect(this.sortedWords[this.currentIndex]);
  }

  changeWordsKnowledgeDegree(id: string, result: boolean): void {
    const index = this.sortedWords.findIndex((item) => item.id === id);
    if (result) {
      this.sortedWords[index].knowledgeDegree += 1;
    } else if (this.sortedWords[index].knowledgeDegree > 0) {
      this.sortedWords[index].knowledgeDegree -= 1;
    }
  }
}
