import { Injectable } from '@angular/core';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LocalStorageKey } from '../../shared/models/local-storage-keys.model';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';
import { UserBookSettings } from '../models/user-book-settings.model';

@Injectable({
  providedIn: 'root',
})
export class EbookSettingsService {
  constructor(private localStorageService: LocalStorageService) { }
  ebookSettingsData: UserBookSettings;

  firstLoadAndSet(): void {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings as string);
    if (!data) {
      this.ebookSettingsData = EBOOK_SETTINGS;
      this.localStorageService
        .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.ebookSettingsData));
    }
  }
}
