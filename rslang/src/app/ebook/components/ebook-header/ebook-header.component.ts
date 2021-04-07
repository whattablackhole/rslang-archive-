import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ebook-header',
  templateUrl: './ebook-header.component.html',
  styleUrls: ['./ebook-header.component.scss'],
})
export class EbookHeader {
  totalPages = 30;
  title = 'ebook';

  onPageChange(pageNo: number): number {
    return pageNo;
  }
}
