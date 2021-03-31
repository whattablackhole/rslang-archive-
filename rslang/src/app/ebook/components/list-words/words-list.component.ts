import {
  Component, Input,
} from '@angular/core';

import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList {
  @Input() words!: Word[];
}
