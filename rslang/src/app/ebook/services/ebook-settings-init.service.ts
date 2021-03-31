import { Injectable } from '@angular/core';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';

@Injectable({
  providedIn: 'root',
})
export class EbookSettingsInitService {
  constructor(private localStorageService: LocalStorageService) { }

  Init(): Promise<void> {
    return new Promise<void>((resolve) => {
      const data = this.localStorageService.getItem('bookSettings');
      if (data === null) {
        const bookSettingsData = EBOOK_SETTINGS;
        this.localStorageService
          .setItem('bookSettings', JSON.stringify(bookSettingsData));
      }
      resolve();
    });
  }
}
