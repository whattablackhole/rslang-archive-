import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../models/word.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class WordDataService extends BaseDataService<Word> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
