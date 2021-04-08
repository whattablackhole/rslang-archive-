import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ebook-header',
  templateUrl: './ebook-header.component.html',
  styleUrls: ['./ebook-header.component.scss'],
})
export class EbookHeader {
  totalPages = 30;
  title = 'ebook';
  @Output() pageNoChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(pageNo: number): void {
    this.pageNoChanged.emit(pageNo);
  }
}
