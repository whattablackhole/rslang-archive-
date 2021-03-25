import { Injectable } from '@angular/core';

import { WORDS_DATA, WORDS_API_URL } from '../constants/constants';

import { IWord } from '../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordsDataService {
  public GetWords() {
    const apiWords: IWord[] = [];
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
