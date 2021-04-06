import { Injectable } from '@angular/core';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable()
export class GameCoreService {
  constructor(private localStorageService: LocalStorageService) {}

  addWordsToLocalStorage(words: WordWithStatistics[]): void {
    const pagesArray: Array<{ page: number; words: WordWithStatistics[] }> = [];
    words.forEach((item: WordWithStatistics) => {
      if (!pagesArray.length) {
        pagesArray.push({ page: item.page, words: [item] });
      } else {
        pagesArray.forEach((pageItem, index) => {
          if (pageItem.page === item.page) {
            pagesArray[index].words.push(item);
          } else {
            pagesArray.push({ page: item.page, words: [item] });
          }
        });
      }
    });
    pagesArray.forEach((item) => {
      const wordsString: string = JSON.stringify(item.words);
      this.localStorageService.setItem(`${item.words[0].group}-${item.page}`, wordsString);
    });
  }

  getLocalStorageWords(group: string, page: string): WordWithStatistics[] | string | null {
    let result: string | null = this.localStorageService.getItem(`${group}-${page}`);
    if (result) {
      try {
        result = JSON.parse(result); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      } catch {
        result = null;
      }
    }
    return result;
  }

  addToSortedWords(sortedWords: WordWithStatistics[], unSortedwords: WordWithStatistics[]): WordWithStatistics[] {
    const filteredWords = unSortedwords.filter(() => (word: WordWithStatistics) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      word.isRemove || word.knowledgeDegree >= 3,
    ); // eslint-disable-line function-paren-newline
    filteredWords.forEach((filterdWord: WordWithStatistics) => {
      // eslint-disable-next-line no-param-reassign
      sortedWords = sortedWords.map((sortedWord: WordWithStatistics) => {
        if (sortedWord.id === filterdWord.id) {
          return filterdWord;
        }
        return sortedWord;
      });
    });
    return sortedWords;
  }

  decreasePageNumber(page: string): string {
    let pageInt: number = parseInt(page, 10);
    pageInt -= 1;
    return pageInt.toString();
  }

  playAudio(url: string): void {
    const audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play(); // eslint-disable-line
  }

  generateStats(gameResults: GameResults, gameStreak: number): Statistics {
    const statistics: Statistics = {
      correct_words: gameResults.correct_words,
      incorrect_words: gameResults.incorrect_words,
      game_name: 'Sprint',
      streak: gameStreak,
      date: new Date(Date.now()),
    };
    return statistics;
  }
}
