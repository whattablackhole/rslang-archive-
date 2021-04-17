import {
  Component, Output, EventEmitter, Input,
} from '@angular/core';

import { COLLECTIONS_SLIDER } from '../../constants/collections-slider';
import { CurrentStateBook } from '../../models/current-state-book.model';

@Component({
  selector: 'app-ebook-header',
  templateUrl: './ebook-header.component.html',
  styleUrls: ['./ebook-header.component.scss'],
})
export class EbookHeader {
  totalPages = 30; // TODO number of pages collections
  title = 'ebook'; // TODO section of ebook
  groupSlider = COLLECTIONS_SLIDER;
  value = 1;
  @Input() currentState: CurrentStateBook;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() groupChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }

  goToPage(): CurrentStateBook {
    console.log('game', this.currentState);
    return this.currentState;
  }

  getSliderTickInterval(): number {
    if (this.groupSlider.showTicks) {
      return this.groupSlider.tickInterval;
    }
    return 0;
  }
}
