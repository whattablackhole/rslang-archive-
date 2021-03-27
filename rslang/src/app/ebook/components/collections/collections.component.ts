import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Collection } from '../../models/collection.models';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  @Input() collections!: Collection[];
  @Output() group: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    console.log(this.collections);
  }

  setGroupSelected(collection: Collection): void {
    this.group.emit(collection.id);
  }
}
