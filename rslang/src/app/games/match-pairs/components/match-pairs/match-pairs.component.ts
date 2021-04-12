import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word.model';
import { WordsDataService } from 'src/app/shared/services/words-data.service';
import { CurrentStateBook } from '../../../../ebook/models/current-state-book.model';

@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss'],
  providers: [WordsDataService],
})
export class MatchPairs implements OnInit {
  words: Word[];
  currentState: CurrentStateBook = { group: 5, page: 1 };

  wordSelected: Word;
  translationSelected: Word;

  constructor(private wordsDataService: WordsDataService) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords(): void {
    this.words = this.wordsDataService.GetWordsMock();
  }

  selectWord(wordSelected: Word): void {
    this.wordSelected = wordSelected;
  }

  checkAnswer(translationSelected: Word): void {
    if (translationSelected.id === this.wordSelected.id) {
      console.log('Correct!');
    } else {
      console.log('Wrong!');
    }
  }
}
