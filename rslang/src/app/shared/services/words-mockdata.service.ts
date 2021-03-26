import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';
import { BaseDataService } from './base-data.service';

@Injectable()
export class WordsMockDataService extends BaseDataService<Word[]> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
