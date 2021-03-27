import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { GetWordDataService } from '../../../shared/services/word.service';
import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-ebook-page',
  templateUrl: './ebook-page.component.html',
  styleUrls: ['./ebook-page.component.scss'],
})
export class EbookPageComponent implements OnInit, OnDestroy {
  collectionWord!: Word;
  wordSubscription!: Subscription;

  constructor(private getWordDataService: GetWordDataService) {}

  ngOnInit(): void {
    this.wordSubscription = this.getWordDataService.wordsData$.subscribe(
      (events: Word) => {
        this.collectionWord = events;
      }
    );
    console.log(this.collectionWord);
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }
}
