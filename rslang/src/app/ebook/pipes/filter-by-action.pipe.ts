import { Pipe, PipeTransform } from '@angular/core';

import { WordWithStatistics } from '../../shared/models/word-statistics.model';
import { ButtonAction } from '../../shared/types/button-action.type';

@Pipe({
  name: 'filterByAction',
})
export class FilterByActionPipe implements PipeTransform {
  transform(list: WordWithStatistics[], difficulty: ButtonAction): WordWithStatistics[] {
    if (!list || !difficulty) {
      return list;
    }
    return list.filter((element) => element.userStats.difficulty === difficulty);
  }
}
