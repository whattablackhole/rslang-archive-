import { Component } from '@angular/core';

import { WordsDataService } from '../../../shared/services/words-data.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList {
  constructor(private wordsDataService: WordsDataService) {}
}
