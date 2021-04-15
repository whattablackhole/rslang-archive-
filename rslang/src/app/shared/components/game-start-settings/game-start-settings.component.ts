import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-game-start-settings',
  templateUrl: './game-start-settings.component.html',
  styleUrls: ['./game-start-settings.component.scss'],
})
export class GameStartSettings implements OnInit {
  groupNumber = 0;
  page = 0;

  groups: number[];
  pages: number[];

  @Input() groupsAmount: number;

  @Input() pagesAmount: number;

  @Output() public groupNumberChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() public pageChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.groups = this.makeFilledArray(this.groupsAmount);
    this.pages = this.makeFilledArray(this.pagesAmount);
  }

  groupNumberChangeHandler():void {
    this.groupNumberChange.emit(`${this.groupNumber}`);
  }

  pageChangeHandler(): void {
    this.pageChange.emit(`${this.page}`);
  }

  makeFilledArray(length: number): number[] {
    const arr = [];
    // eslint-disable-next-line
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  }
}
