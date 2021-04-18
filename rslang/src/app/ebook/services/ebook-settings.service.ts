import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { API_URL } from '../../shared/constants/api-url';
import { LocalStorageKey } from '../../shared/models/local-storage-keys.model';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';
import { GlobalSettings } from '../models/global-settings.model';
import { UserBookSettings } from '../models/user-book-settings.model';
import { SettingsActionService } from './settings-action.service';
import { SettingsDataService } from './settings-data.service';

@Injectable()
export class EbookSettingsService {
  ebookSettings: UserBookSettings;
  isUserAuthenticated = this.authService.getUserAuthenticationStatus();
  userId: string;

  constructor(
    private localStorageService: LocalStorageService,
    private settingsService: SettingsDataService,
    private settingsActionService: SettingsActionService,
    private authService: AuthService,
  ) { }

  load(): void {
    if (this.isUserAuthenticated) {
      this.userId = this.authService.getUserId() as string;
      this.settingsService.getData(API_URL.USER_SETTINGS(this.userId));

      this.settingsService.data$.subscribe((data: GlobalSettings) => {
        this.ebookSettings = data.optional;
      });
      if (this.ebookSettings) {
        this.localStorageService
          .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.ebookSettings));
      }
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

  setUserSettings(): void {
    if (!localStorage.hasOwnProperty(LocalStorageKey.EbookSettings)) {
      this.ebookSettings = EBOOK_SETTINGS;
    }
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.ebookSettings = JSON.parse(data as string) as UserBookSettings;
    const userId = this.authService.getUserId() as string;
    this.settingsActionService.upsertSettings(
      userId,
      {
        wordsPerDay: 20,
        optional: { ...this.ebookSettings },
      },
    );
  }
}
