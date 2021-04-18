import {
  Component,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WordsCollection } from '../../models/words-collection.model';
import { CONFIG_EBOOK } from '../../constants/config-ebook';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  changeSelectedGroup(collection: WordsCollection): Promise<boolean> {
    const path = this
      .router
      .createUrlTree([collection.id + 1, 'page', 1], { relativeTo: this.route })
      .toString();
    return this.router.navigate([path]);
  }

  getProgress(i: number): string {
    return `${(100 * (1 - (this.wordsCollections[i].progress / this.wordsCollections[i].words))).toFixed(0)}%`;
  }
}
