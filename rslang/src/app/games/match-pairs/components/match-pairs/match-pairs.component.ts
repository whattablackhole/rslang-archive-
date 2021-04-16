import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word.model';
import { WordsDataService } from 'src/app/shared/services/words-data.service';
import { CardData } from '../../models/card-data.model';
import { CardState } from '../../models/card-state.type';

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

  state: CardState;
  matchedCount = 0;

  constructor(private wordsDataService: WordsDataService) { }

  ngOnInit(): void {
    this.renderCards();
  }

  renderCards(): void {
    this.cards = [];
    this.words = this.wordsDataService.GetWordsMock();
    this.words.forEach((word) => {
      const cardData: CardData = {
        id: word.id,
        word: word.word,
        translation: word.wordTranslate,
        state: 'default'
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });
    this.cards = this.shuffleCards(this.cards);
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

  setDefaultState(): void{
    this.state = 'default';
  }

  checkAnswer(): void {
    setTimeout(() => {
      const cardOne = this.selectedCards[0];
      const cardTwo = this.selectedCards[1];
      const nextState = cardOne.id === cardTwo.id ? 'matched' : 'error';
      cardOne.state = cardTwo.state = nextState;

      this.selectedCards = [];
      if (nextState === 'matched') {
        this.matchedCount++;
        if (this.matchedCount === this.words.length) {
          console.log('Game Finished!');
        }
      }
    }, 500);
  }

  shuffleCards(cards: any[]): any[] {
    return cards.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

}
