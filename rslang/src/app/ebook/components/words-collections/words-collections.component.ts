import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { WordsCollection } from '../../models/words-collection.model';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections {
  @Input() wordsCollections!: WordsCollection[];
  @Output() groupIdChanged: EventEmitter<number> = new EventEmitter<number>();

  changeSelectedGroup(collection: WordsCollection): void {
    this.groupIdChanged.emit(collection.id);
  }

  getProgress(item: number): string {
    return `${(100 * (this.wordsCollections[item].progress / this.wordsCollections[item].words)).toFixed(0)}%`;
  }
}
