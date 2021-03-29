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
  @Output() getGroup: EventEmitter<number> = new EventEmitter<number>();

  setSelectedGroup(collection: WordsCollection): void {
    this.getGroup.emit(collection.id);
  }
}
