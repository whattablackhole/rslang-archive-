import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Word } from '../models/word.model';
import { Options } from '../models/optionss.model';
import { BaseDataService } from './base-data.service';

@Injectable({
  providedIn: 'root',
})
export class GetWordsDataService extends BaseDataService<Word[]> {
  options!: Options;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  setId(page: number, group: number): void {
    this.options.page = page;
    this.options.group = group;
  }
}
