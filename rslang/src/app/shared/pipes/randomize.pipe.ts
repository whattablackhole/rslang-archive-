import { Pipe, PipeTransform } from '@angular/core';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';

@Pipe({
  name: 'randomize',
  pure: true,
})
export class RandomizePipe implements PipeTransform {
  transform(words: WordWithStatistics[], startIndex: number, finishIndex: number): WordWithStatistics[] {
    const array = words.slice(startIndex, finishIndex);
    let currentIndex = array.length;
    let randomIndex;
    let temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
