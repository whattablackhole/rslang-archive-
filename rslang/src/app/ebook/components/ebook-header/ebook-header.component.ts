import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ebook-header',
  templateUrl: './ebook-header.component.html',
  styleUrls: ['./ebook-header.component.scss'],
})
export class EbookHeader {
  totalPages = 30; // TODO number of pages collections
  title = 'ebook'; // TODO section of ebook
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
}
