import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { WordsDataService } from '../../../shared/services/words-data.service';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { EbookSettingsService } from '../../services/ebook-settings.service';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  providers: [WordsDataService],
})
export class EbookHome implements OnInit, OnDestroy {
  userBookSettings: UserBookSettings;
  @Input() bookSettingsChanged: UserBookSettings;
  ebookSettingsSubscription: Subscription;

  constructor(
    private ebookSettingsService: EbookSettingsService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.ebookSettingsService.load();
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.ebookSettingsSubscription = this.localStorageService.changes$
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
  }

  changeSelectedBookPage(pageNumberChanged: number): void {
    this.userBookSettings.currentState.page = pageNumberChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
  }

  changeSelectedGroupId(groupIdChanged: number): void {
    this.userBookSettings.currentState.group = groupIdChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
  }

  ngOnDestroy(): void {
    this.ebookSettingsSubscription.unsubscribe();
  }
}
