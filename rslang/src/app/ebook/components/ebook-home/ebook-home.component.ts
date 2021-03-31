import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { CONFIG_EBOOK } from '../../constants/config-ebook';
import { Word } from '../../../shared/models/word.model';
import { WordsCollection } from '../../models/words-collection.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../shared/models/change-storage.model';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  providers: [WordsDataService],
})
export class EbookHome implements OnInit, OnDestroy {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;
  words!: Word[];
  userBookSettings: UserBookSettings;
  ebookSettingsSubscription = new Subscription();
  ebookSettingsChanges$ = this.localStorageService.changes$;

  constructor(
    private wordsDataService: WordsDataService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.words = this.wordsDataService.GetWords();

    this.ebookSettingsSubscription = this.ebookSettingsChanges$
      .subscribe(
        (events: StorageChanges) => {
          if (events.type === 'set' && events.key === 'bookSettings') {
            this.userBookSettings = JSON.parse(events.value as string) as UserBookSettings;
          }
        },
      );
  }

  changeSelectedBookSetting(bookSettingsChanged: UserBookSettings): void {
    this.localStorageService
      .setItem('bookSettings', JSON.stringify(bookSettingsChanged));
  }

  ngOnDestroy(): void {
    this.ebookSettingsSubscription.unsubscribe();
  }
}
