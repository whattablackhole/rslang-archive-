import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { EbookSettingsService } from '../../services/ebook-settings.service';
import { CONFIG_EBOOK } from '../../constants/config-ebook';
import { Word } from '../../../shared/models/word.model';
import { WordsCollection } from '../../models/words-collection.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  providers: [WordsDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookHome implements OnInit, OnDestroy {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;
  words!: Word[];
  userBookSettings: UserBookSettings;
  @Input() bookSettingsChanged: UserBookSettings;
  ebookSettingsSubscription: Subscription;
  ebookSettingsChanges$ = this.localStorageService.changes$;

  constructor(
    private ebookSettingsService: EbookSettingsService,
    private wordsDataService: WordsDataService,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.ebookSettingsService.firstLoad();
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.ebookSettingsSubscription = this.ebookSettingsChanges$
      .subscribe(
        (events: StorageChanges) => {
          if (events.type === LocalStorageType.Set && events.key === LocalStorageKey.EbookSettings as string) {
            this.userBookSettings = JSON.parse(events.value as string) as UserBookSettings;
          }
        },
      );
  }

  changeSelectedBookSetting(bookSettingsChanged: UserBookSettings): void {
    this.userBookSettings = bookSettingsChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.ebookSettingsSubscription.unsubscribe();
  }
}
