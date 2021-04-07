import { Component } from '@angular/core';
// import {  }

@Component({
  selector: 'app-ebook-title',
  templateUrl: './ebook-title.component.html',
  styleUrls: ['./ebook-title.component.scss'],
})
export class EbookTitle {
  title = 'ebook';

  onPageChange(pageNo: number): void {
    console.log('Current page: ', pageNo);
  }
}
