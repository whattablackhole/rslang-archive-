import { Injectable } from '@angular/core';

import { WORDS_DATA, WORDS_API_URL } from '../constants/constants';

import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordsDataService {
  public GetWords(): Word[] {
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
