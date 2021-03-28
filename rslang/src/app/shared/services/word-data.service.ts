import { Word } from '../models/word.model';
import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/base-url';
@Injectable()
export class WordDataService extends BaseDataService<Word> {
  getPath = (id: string) => `${BASE_URL}/words/${id}`;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
