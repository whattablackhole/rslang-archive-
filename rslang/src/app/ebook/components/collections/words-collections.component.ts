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
  @Input() collections!: WordsCollection[];
  @Output() group: EventEmitter<number> = new EventEmitter<number>();

  setGroupSelected(collection: WordsCollection): void {
    this.group.emit(collection.id);
  }
}
