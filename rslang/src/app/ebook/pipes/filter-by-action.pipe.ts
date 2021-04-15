import { Pipe, PipeTransform } from '@angular/core';

import { WordAndStatistics } from '../../shared/models/word-statistics.model';
import { ButtonAction } from '../../shared/types/button-action.type';

@Pipe({
  name: 'filterByAction',
})
export class FilterByActionPipe implements PipeTransform {
  transform(list: WordAndStatistics[], difficulty: ButtonAction): WordAndStatistics[] {
    if (!list || !difficulty) {
      return list;
    }
    return list.filter((element) => element.difficulty === difficulty);
  }
}
