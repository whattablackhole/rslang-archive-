import {
  Component, EventEmitter, Input, Output,
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

  onGroupChange(groupId: number): void {
    this.groupChanged.emit(groupId);
  }

  getSliderTickInterval(): number {
    return this.groupSlider.showTicks ? this.groupSlider.tickInterval : 0;
  }
}
