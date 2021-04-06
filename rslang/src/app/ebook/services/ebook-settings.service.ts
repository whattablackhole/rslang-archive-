import { Injectable } from '@angular/core';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LocalStorageKey } from '../../shared/models/local-storage-keys.model';
import { EBOOK_SETTINGS } from '../constants/ebook-settings';

@Injectable()
export class EbookSettingsService {
  constructor(private localStorageService: LocalStorageService) { }

  firstLoad(): void {
    if (this.localStorageService.isKey(LocalStorageKey.EbookSettings)) {
      return;
    }
    this.setDefaultSettings(this.localStorageService.isKey(LocalStorageKey.EbookSettings));
  }

  private setDefaultSettings(data: boolean): void {
    if (!data) {
      const defaultSettings = EBOOK_SETTINGS;
      this.localStorageService
        .setItem(LocalStorageKey.EbookSettings, JSON.stringify(defaultSettings));
    }
  }

}
