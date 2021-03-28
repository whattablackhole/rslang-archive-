import { Component, Input } from '@angular/core';

import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss'],
})
export class ListWords {
  @Input() words!: Word[];
}
