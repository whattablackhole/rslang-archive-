import { Component, OnInit } from '@angular/core';
import {
  trigger, style, animate, transition, state
} from '@angular/animations';
import { Word } from 'src/app/shared/models/word.model';
import { WordsDataService } from 'src/app/shared/services/words-data.service';

@Component({
  selector: 'app-savannah',
  templateUrl: './savannah.component.html',
  styleUrls: ['./savannah.component.scss'],
  providers: [ WordsDataService ],
  animations: [
    trigger('fallingDown', [
      state('start', style({
        top: '0%',
      })),
      state('end', style({
        top: "100%"
      })),
      transition(
        '* => end',
        animate(4000),
      ),
      transition(
        '* => start',
        animate(0),
      ),
    ])
  ]
})

export class Savannah implements OnInit {
  words: Word[];
  questionCounter = 1;
  streak = 0;
  biggestStreak = 0;
  lives: boolean[] = [true, true, true];
  unUsedWords: Word[];
  currentQuestion: Word;
  currentAnswers: Word[] = [];
  correctAnswers: Word[]= [];
  wrongAnswers: Word[] = [];
  isGameEnd: boolean = false;
  fallingDownAnimationState: string = "start";
  timer: any;

  constructor(
    private wordsDataService: WordsDataService,
  ) {

  }

  ngOnInit () {
    this.words = this.wordsDataService.GetWords();
    this.unUsedWords = [...this.words];
    this.generateRound();
    console.log(this.wordsDataService.GetWords());
  }

  generateRound() {
    this.generateQuestion();
    this.generateAnswers();
    setTimeout(() => {
      this.fallingDownAnimationState = "end";
    }, 0)
    this.nextRoundTimer();
    console.log(this.currentAnswers, "f")
  }

  nextRoundTimer( ) {
    if(this.questionCounter > this.words.length || !this.lives.length) {
      this.isGameEnd = true;
      if(this.biggestStreak < this.streak) {
        this.biggestStreak = this.streak;
        this.streak = 0;
      }
      console.log('end', this.correctAnswers, this.wrongAnswers);
      return;
    }
    this.timer = setTimeout(() => {
      this.lives.splice( 0, 1);
      this.currentAnswers.length = 0;
      this.wrongAnswers.push(this.currentQuestion);
      console.log('incorrect');
      this.generateRound();
      this.fallingDownAnimationState = "start";

      console.log('this', this);
      if(this.biggestStreak < this.streak) {
        this.biggestStreak = this.streak;
        this.streak = 0;
      }

    }, 4000)
    console.log(this.timer);
  }

  checkAnswer(answer: Word) {
    console.log(answer, this.fallingDownAnimationState);

    if(answer.id === this.currentQuestion.id) {
      console.log('correct');
      // todo bug animatsii knopki

      this.streak += 1;
      this.currentAnswers.length = 0;
      this.correctAnswers.push(this.currentQuestion);

    } else {
      if(this.biggestStreak < this.streak) {
        this.biggestStreak = this.streak;
        this.streak = 0;
      }
      this.lives.splice( 0, 1);
      this.currentAnswers.length = 0;
      this.wrongAnswers.push(this.currentQuestion);
      console.log('incorrect');
    }

    clearTimeout(this.timer);

    this.timer = null;
    this.questionCounter +=1;
    if(this.questionCounter > this.words.length || !this.lives.length) {
      this.isGameEnd = true;
      if(this.biggestStreak < this.streak) {
        this.biggestStreak = this.streak;
        this.streak = 0;
      }
      console.log('end', this.correctAnswers, this.wrongAnswers);
      return;
    }

    this.generateRound();
    this.fallingDownAnimationState = "start";
    return;
  }

  generateQuestion() {
    this.currentQuestion = this.unUsedWords.splice(this.randomNumber(0, this.unUsedWords.length), 1)[0];
  }

  generateAnswers() {
    this.currentAnswers.push(this.currentQuestion);
    while(this.currentAnswers.length !== 4 ) {
      let answer = this.words[this.randomNumber(0, this.words.length)];

      if(this.currentAnswers.some((a) => a.id === answer.id )) {
        continue;
      }

      this.currentAnswers.push(answer);
    }
  }

  randomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
