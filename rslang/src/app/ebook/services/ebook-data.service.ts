import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { LocalStorageService } from '../../core/services/local-storage.service';
import { WordsDataService } from '../../shared/services/words-data.service';
import { Word } from '../../shared/models/word.model';
import { CurrentStateBook } from '../models/current-state-book.model';
import { API_URL } from '../../shared/constants/api-url';

@Injectable()
export class EbookDataService {
  words: Word[];
  constructor(
    private localStorageService: LocalStorageService,
    private wordsDataService: WordsDataService,
  ) { }

  getWords(option: CurrentStateBook): Word[] {
    const params: HttpParams = new HttpParams()
      .set('group', String(option.group - 1))
      .set('page', String(option.page - 1));
    this.wordsDataService.getData(API_URL.WORDS, { params });
    this.wordsDataService.data$.subscribe((words: Word[]) => {
      this.words = words;
    });
    return this.words;
  }
}
