import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { WordsCollection } from '../../models/words-collection.model';
import { CONFIG_EBOOK } from '../../constants/config-ebook';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;
  
  constructor(private router: Router) {}

  changeSelectedGroup(collection: WordsCollection) {
    const path = `ebook/${collection.path || ''}`;
    void this.router.navigate([path, collection.id + 1]);
  }

  getProgress(i: number): string {
    return `${(100 * (this.wordsCollections[i].progress / this.wordsCollections[i].words)).toFixed(0)}%`;
  }
}
