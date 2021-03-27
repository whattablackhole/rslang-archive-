import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-ebook-page',
  templateUrl: './ebook-page.component.html',
  styleUrls: ['./ebook-page.component.scss'],
})
export class EbookPageComponent implements OnInit, OnDestroy {
  collectionWord!: Word[];
  wordSubscription!: Subscription;

  constructor(private wordsDataService: WordsDataService) {}

  ngOnInit(): void {
    this.collectionWord = this.wordsDataService.GetWords();
    console.log(this.collectionWord);
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }
}
