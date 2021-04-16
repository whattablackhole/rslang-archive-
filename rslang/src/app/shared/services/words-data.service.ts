import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from '../../core/services/base-data.service';
import { CurrentStateBook } from '../../ebook/models/current-state-book.model';
import { API_URL } from '../constants/api-url';
import { WORDS_API_URL, WORDS_DATA } from '../constants/constants';
import { Word } from '../models/word.model';

@Injectable()
export class WordsDataService extends BaseDataService<Word[]> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getWords(option: CurrentStateBook): void {
    const params: HttpParams = new HttpParams()
      .set('group', String(option.group - 1))
      .set('page', String(option.page - 1));
    this.getData(API_URL.WORDS, { params });
  }

  getWordsMock(): Word[] {
    const apiWords: Word[] = [];
    WORDS_DATA.forEach((wordData) => {
      const word = wordData;
      word.image = WORDS_API_URL + word.image;
      word.audio = WORDS_API_URL + word.audio;
      word.audioMeaning = WORDS_API_URL + word.audioMeaning;
      word.audioExample = WORDS_API_URL + word.audioExample;

      apiWords.push(word);
    });
    return apiWords;
  }
}
