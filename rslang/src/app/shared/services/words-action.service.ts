import { Word } from '../models/word.model';
import { Injectable } from '@angular/core';
import { BaseActionService } from './base-action.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordActionService extends BaseActionService<Word[]> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
