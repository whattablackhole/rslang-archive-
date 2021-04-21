import {
  Component, Output, EventEmitter, Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { CurrentStateBook } from '../../models/current-state-book.model';

@Component({
  selector: 'app-ebook-header',
  templateUrl: './ebook-header.component.html',
  styleUrls: ['./ebook-header.component.scss'],
})
export class EbookHeader {
  totalPages = 30; // TODO number of pages collections
  //  // TODO section of ebook
  @Input() title: string;
  @Input() currentState: CurrentStateBook;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() groupChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
  ) {}

  openSettings(): Promise<boolean> {
    const path = this
      .router
      .createUrlTree(['ebook', 'settings'])
      .toString();
    return this.router.navigate([path]);
  }

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }

  onGroupChange(groupId: number): void {
    this.groupChanged.emit(groupId);
  }
}
