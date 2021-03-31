import { Component, OnInit } from '@angular/core';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { CONFIG_EBOOK } from '../../constants/config-ebook';
import { EBOOK_SETTINGS } from '../../constants/ebook-settings';
import { Word } from '../../../shared/models/word.model';
import { WordsCollection } from '../../models/words-collection.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  providers: [WordsDataService],
})
export class EbookHome implements OnInit {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;
  words!: Word[];
  userBookSettings: UserBookSettings = EBOOK_SETTINGS;

  constructor(
    private wordsDataService: WordsDataService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.words = this.wordsDataService.GetWords();
  }
}
