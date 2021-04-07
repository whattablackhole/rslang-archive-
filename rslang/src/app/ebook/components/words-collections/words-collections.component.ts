import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { WordsCollection } from '../../models/words-collection.model';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections {
  @Input() wordsCollections!: WordsCollection[];
  @Output() groupIdChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {}

  changeSelectedGroup(collection: WordsCollection) {
    this.groupIdChanged.emit(collection.id);
    const path = `ebook/${collection.path || ''}`;
    void this.router.navigate([path, collection.id + 1]);
  }

  getProgress(i: number): string {
    return `${(100 * (this.wordsCollections[i].progress / this.wordsCollections[i].words)).toFixed(0)}%`;
  }
}
