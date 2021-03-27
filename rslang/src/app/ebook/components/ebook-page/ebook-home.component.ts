import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { CONFIG_EBOOK } from '../../settings/constants/configEbook';
import { Word } from '../../../shared/models/word.model';
import { Collection } from '../../models/collection.models';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  styleUrls: ['./ebook-home.component.scss'],
})
export class EbookHomeComponent implements OnInit {
  collections: Collection[] = CONFIG_EBOOK.collections;
  collectionWord!: Word[];

  group = 0;
  wordSubscription!: Subscription;

  constructor(private wordsDataService: WordsDataService) {}

  ngOnInit(): void {
    this.collectionWord = this.wordsDataService.GetWords();
    console.log(this.collections);
  }
}
