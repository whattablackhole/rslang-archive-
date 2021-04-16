import { Pipe, PipeTransform } from '@angular/core';

import { Word } from '../../shared/models/word.model';
import { ButtonAction } from '../../shared/types/button-action.type';

@Pipe({
  name: 'filterByAction',
})
export class FilterByActionPipe implements PipeTransform {
  transform(list: Word[], difficulty: ButtonAction): Word[] {
    if (!list || !difficulty) {
      return list;
    }
    return list.filter((element: Word) => element.word === difficulty);
  }
}
