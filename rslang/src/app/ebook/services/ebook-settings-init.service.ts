import { Injectable } from '@angular/core';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LocalStorageKey } from '../../shared/models/local-storage-keys.model';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';
import { UserBookSettings } from '../models/user-book-settings.model';

@Injectable({
  providedIn: 'root',
})
export class EbookSettingsInitService {
  constructor(private localStorageService: LocalStorageService) { }
  ebookSettingsData: UserBookSettings;

  init(): void {
    const data = this.localStorageService.getItem(LocalStorageKey.ebookSettings);
    if (data === null) {
      this.ebookSettingsData = EBOOK_SETTINGS;
      this.localStorageService
        .setItem(LocalStorageKey.ebookSettings, JSON.stringify(this.ebookSettingsData));
    }
  }
}
