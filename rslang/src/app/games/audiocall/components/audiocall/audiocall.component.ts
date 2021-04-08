import {
  animate, keyframes, state, style, transition, trigger, AnimationEvent,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { GameWordsState } from 'src/app/games/interfaces/game-words-state.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { Observable } from 'rxjs';
import { GameCoreService } from '../../../services/game-core.service';
import { WordsDataService } from '../../../../shared/services/words-data.service';
import { WORDS_API_URL } from '../../../../shared/constants/constants';
import { UserAggregatedWordsService } from '../../../../shared/services/user-words-data.service';
import { BlockPositionState } from '../types/block-position-state.type';
import { GameStorageWordsService } from '../../../services/game-storage-words.service';
import { WordDataService } from '../../../../shared/services/word-data.service';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.scss'],
  providers: [WordsDataService, GameCoreService, UserAggregatedWordsService, GameStorageWordsService, WordDataService],
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
    private wordsDataService: WordsDataService,
    private userAggregatedWordsService: UserAggregatedWordsService,
    private gameStorageWordsService: GameStorageWordsService,
  ) {
    this.words = this.wordsDataService.data$;
    this.userWords = this.userAggregatedWordsService.data$;
    this.gameResultWords = { correct_words: [], incorrect_words: [] };
    this.sortedWords = [];
  }

  ngOnInit(): void {
    this.gameStorageWordsService.getWords(this.group, this.page);
    this.gameStorageWordsService.createWords(this.group, this.page, this.gameWordsState);
    this.gameStorageWordsService.sortedWords$.subscribe((sortedWords: WordWithStatistics[]) => {
      this.sortedWords = sortedWords;
    });
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
    this.gameCoreService.playAudio(`assets/${this.sortedWords[this.currentIndex].audio}`);
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

  updateGameState(): void {
    this.currentIndex += 1;
    this.gameCoreService.playAudio(`assets/${this.sortedWords[this.currentIndex].audio}`);
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
    this.statistics = this.gameCoreService.generateStats(this.gameResultWords, this.biggestStreak, 'AudioCall');
    this.gameCoreService.addStatsToLocalStorage(this.statistics);
    // if (!'userService') {   Feature Auth Code
    //   console.log(1);
    // } else {
    //   this.gameCoreService.addWordsToLocalStorage(this.sortedWords);
    //   this.gameCoreService.addStatsToLocalStorage(this.statistics);
    // }
  }

  checkIfGameFinished(): void {
    if (this.currentIndex + 1 === this.gameWordsState.wordsLength - this.gameWordsState.minAmout) {
      this.finishGame();
    }
  }

  checkIfAsnwerCorrect(item: WordWithStatistics): boolean {
    return this.sortedWords[this.currentIndex].word === item.word;
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

  changeWordsKnowledgeDegree(id: string, result: boolean): void {
    const index = this.sortedWords.findIndex((item) => item.id === id);
    if (result) {
      this.sortedWords[index].knowledgeDegree += 1;
    } else if (this.sortedWords[index].knowledgeDegree > 0) {
      this.sortedWords[index].knowledgeDegree -= 1;
    }
  }
}
