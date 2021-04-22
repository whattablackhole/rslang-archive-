import { Pipe, PipeTransform } from '@angular/core';

import { UsersWords } from '../../shared/models/users-words.model';
import { WordOptions } from '../models/word-options.model';
import { ButtonAction } from '../../shared/types/button-action.type';

@Pipe({
  name: 'filterByAction',
  pure: false,
})
export class FilterByActionPipe implements PipeTransform {
  transform(list: WordOptions[], userWords: UsersWords[], action?: ButtonAction): WordOptions[] {
    if (!list || !userWords) {
      return list;
    }
    if (action) {
      return list.filter((element: WordOptions) => {
        const temp = userWords.find((el: UsersWords) => el.wordId === element.id && el.difficulty === action);
        return userWords.includes(temp as UsersWords);
      });
    }
    return list.filter((element: WordOptions) => {
      const temp = userWords.find((el: UsersWords) => el.wordId === element.id && el.difficulty === 'removed');
      return !userWords.includes(temp as UsersWords);
    });
  }
}
