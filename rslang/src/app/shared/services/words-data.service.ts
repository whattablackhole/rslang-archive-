import { Word } from '../models/word.model';
import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';
import { WORDS_API_URL, WORDS_DATA } from '../constants/constants';
import { BASE_URL } from '../constants/base-url';

@Injectable()
export class WordsDataService extends BaseDataService<Word[]> {
  getPath = () => `${BASE_URL}/words`;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  public GetWords() {
    const apiWords: Word[] = [];
    WORDS_DATA.forEach(function (word) {
      (word.image = WORDS_API_URL + word.image),
        (word.audio = WORDS_API_URL + word.audio),
        (word.audioMeaning = WORDS_API_URL + word.audioMeaning),
        (word.audioExample = WORDS_API_URL + word.audioExample);

      apiWords.push(word);
    });
    return apiWords;
  }
}
