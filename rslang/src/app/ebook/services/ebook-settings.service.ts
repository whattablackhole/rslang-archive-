import { Injectable } from '@angular/core';

import { LocalStorageService } from '../../core/services/local-storage.service';
import { SettingsDataService } from './settings-data.service';
import { UserBookSettings } from '../models/user-book-settings.model';
import { GlobalSettings } from '../models/global-settings.model';
import { LocalStorageKey } from '../../shared/models/local-storage-keys.model';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';
import { API_URL } from '../../shared/constants/api-url';
import { USER_MOCK_DATA } from '../constants/user-mock-data';

@Injectable()
export class EbookSettingsService {
  ebookSettings: UserBookSettings;
  isUserAuthenticated = false;
  userId: string;

  constructor(
    private localStorageService: LocalStorageService,
    private settingsService: SettingsDataService,
  ) { }

  load(): void {
    if (this.isUserAuthenticated) {
      this.userId = USER_MOCK_DATA.userId;
      this.settingsService.getData(API_URL.USER_SETTINGS(this.userId));
      this.settingsService.data$.subscribe((data: GlobalSettings) => {
        this.ebookSettings = data.optionals;
      });
      this.localStorageService
        .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.ebookSettings));
    }

    if (!localStorage.hasOwnProperty(LocalStorageKey.EbookSettings)) {
      this.setDefaultSettings();
    }
  }

  private setDefaultSettings(): void {
    const defaultSettings = EBOOK_SETTINGS;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(defaultSettings));
  }
}
