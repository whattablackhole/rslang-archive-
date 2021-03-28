import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { WordsCollection } from '../../models/words-collection.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class Collections {
  @Input() collections!: WordsCollection[];
  @Output() group: EventEmitter<number> = new EventEmitter<number>();

  setGroupSelected(collection: WordsCollection): void {
    this.group.emit(collection.id);
  }
}
