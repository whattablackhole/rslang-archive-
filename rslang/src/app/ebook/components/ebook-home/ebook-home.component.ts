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
  userBookSettings: UserBookSettings;
  @Input() bookSettingsChanged: UserBookSettings;
  ebookSettingsSubscription: Subscription;
  ebookSettingsChanges$ = this.localStorageService.changes$;

  constructor(
    private ebookSettingsService: EbookSettingsService,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.ebookSettingsService.load();
  }

  changeSelectedBookSetting(bookSettingsChanged: UserBookSettings): void {
    this.userBookSettings = bookSettingsChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    this.cdr.detectChanges();
  }

  changeSelectedBookPage(pageNoChanged: number): void {
    this.userBookSettings.currentState.page = pageNoChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    this.cdr.detectChanges();
  }

  changeSelectedGroupId(groupIdChanged: number): void {
    this.userBookSettings.currentState.group = groupIdChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.ebookSettingsSubscription.unsubscribe();
  }
}
