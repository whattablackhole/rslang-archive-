import { Word } from '../models/word.model';
import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordsDataService extends BaseDataService<Word[]> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
