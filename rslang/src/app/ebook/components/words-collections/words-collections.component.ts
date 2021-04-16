import {
  Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { WordsCollection } from '../../models/words-collection.model';
import { CONFIG_EBOOK } from '../../constants/config-ebook';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;

  constructor(private router: Router) {}

  changeSelectedGroup(collection: WordsCollection): Promise<boolean> {
    const path = `ebook/${String(collection.path) || ''}`;
    return this.router.navigate([path, collection.id + 1]);
  }

  getProgress(i: number): string {
    return `${(100 * (this.wordsCollections[i].progress / this.wordsCollections[i].words)).toFixed(0)}%`;
  }
}
