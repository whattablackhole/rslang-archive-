import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseDataService } from './base-data.service';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class GetWordDataService extends BaseDataService<Word> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
