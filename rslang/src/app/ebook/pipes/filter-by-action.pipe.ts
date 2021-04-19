import { Pipe, PipeTransform } from '@angular/core';

import { ButtonAction } from '../../shared/types/button-action.type';
import { WordOptions } from '../models/word-options';

@Pipe({
  name: 'filterByAction',
})
export class FilterByActionPipe implements PipeTransform {
  transform(list: WordOptions[], difficulty: ButtonAction): WordOptions[] {
    if (!list || !difficulty) {
      return list;
    }
    return list.filter((element: WordOptions) => element.difficulty === difficulty);
  }
}
