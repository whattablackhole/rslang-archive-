import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word.model';
import { WordsDataService } from 'src/app/shared/services/words-data.service';
import { CardData } from '../../models/card-data.model';

@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss'],
  providers: [WordsDataService],
})
export class MatchPairs implements OnInit {
  cards: CardData[] = [];
  selectedCards: CardData[] = [];
  words: Word[] = [];

  correctAnswers = 0;

  constructor(private wordsDataService: WordsDataService) { }

  ngOnInit(): void {
    this.renderCards();
  }

  renderCards(): void {
    this.cards = [];
    this.words = this.wordsDataService.getWordsMock();
    this.words.forEach((word) => {
      const cardDataEN: CardData = {
        id: word.id,
        title: word.word,
        state: 'default',
      };
      const cardDataRU: CardData = {
        id: word.id,
        title: word.wordTranslate,
        state: 'default',
      };
      this.cards.push({ ...cardDataEN });
      this.cards.push({ ...cardDataRU });
    });
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    if (cardInfo.state === 'default' && this.selectedCards.length < 2) {
      cardInfo.state = 'selected';
      this.selectedCards.push(cardInfo);
      if (this.selectedCards.length > 1) {
        this.checkAnswer();
      }
    } else if (cardInfo.state === 'selected') {
      cardInfo.state = 'default';
      this.selectedCards.pop();
    }
  }

  checkAnswer(): void {
    setTimeout(() => {
      const cardOne = this.selectedCards[0];
      const cardTwo = this.selectedCards[1];
      const nextState = cardOne.id === cardTwo.id ? 'matched' : 'error';
      cardOne.state = nextState;
      cardTwo.state = nextState;

      setTimeout(() => {
        if (nextState === 'error') {
          cardOne.state = 'default';
          cardTwo.state = 'default';
        }
      }, 500);

      this.selectedCards = [];
      if (nextState === 'matched') {
        this.correctAnswers += 1;
        if (this.correctAnswers === this.words.length) {
          console.log('Game Finished!');
        }
      }
    }, 1000);
  }
}
