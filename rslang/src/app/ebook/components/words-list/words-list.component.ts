import { Component, OnInit } from '@angular/core';

import { WordsDataService } from '../../../shared/services/words-data.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList implements OnInit{
  
  constructor(private wordsDataService: WordsDataService) {}

  ngOnInit() {

  }
}
