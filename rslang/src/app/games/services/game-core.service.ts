import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { UserWord } from 'src/app/shared/models/user-word.model';
import { Statistics } from 'src/app/shared/models/statistics-short.model';
import { WordId } from 'src/app/shared/types/word-id.type';
import { GameName } from '../../shared/types/game-name.type';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { WordsByPages } from '../interfaces/words-by-pages.model';
@Injectable()
export class GameCoreService {
  constructor(private localStorageService: LocalStorageService) {}

  getWordsPath = (group: string, page: string): string => `${BASE_URL}/words?group=${group}&page=${page}`;

  getUserWordsPath = (id: string): string => `${BASE_URL}/users/${id}/words`;

  addWordsToLocalStorage(words: WordWithStatistics[]): void {
    const wordsByPages: Array<WordsByPages> = this.sortByPage(words);
    wordsByPages.forEach((item) => {
      const wordsString: string = JSON.stringify(item.words);
      this.localStorageService.setItem(
        `${item.words[0].group}-${item.page}`,
        wordsString,
      );
    });
  }

  sortByPage(words: WordWithStatistics[]) : Array<WordsByPages> {
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
    return pagesArray;
  }

  addStatsToLocalStorage(stats: Statistics): void {
    let result: Statistics[] | string | null = this.localStorageService.getItem(
      'statistics',
    );
    if (result) {
      try {
        result = JSON.parse(result) as Statistics[];
      } catch {
        result = null;
      }
    }
    if (Array.isArray(result)) {
      result.push(stats);
      this.localStorageService.setItem('statistics', JSON.stringify(result));
    } else {
      this.localStorageService.setItem('statistics', JSON.stringify([stats]));
    }
  }

  getLocalStorageWords(
    group: string,
    page: string,
  ): WordWithStatistics[] | string | null {
    let result:
    | WordWithStatistics[]
    | string
    | null = this.localStorageService.getItem(`${group}-${page}`);
    if (result) {
      try {
        result = JSON.parse(result) as WordWithStatistics[];
      } catch {
        result = null;
      }
    }
    return result;
  }

  filterGameWords(words:WordWithStatistics[]): WordWithStatistics[] {
    return words.filter(
      (word: WordWithStatistics) => word.userStats.difficulty !== 'removed'
       && (word.userStats.optional.knowledgeDegree) < 3,
    );
  }

  addLocalToSortedWords(
    sortedWords: WordWithStatistics[],
    unSortedwords: WordWithStatistics[],
  ): WordWithStatistics[] {
    const sorted = sortedWords;
    for (let i = 0; i < sorted.length; i += 1) {
      for (let y = 0; y < unSortedwords.length; y += 1) {
        if (sorted[i].id === unSortedwords[y].id) {
          sorted.splice(i, 1, unSortedwords[y]);
          break;
        }
      }
    }
    return sorted;
  }

  addToSortedWords(
    sortedWords: WordWithStatistics[],
    unSortedwords: UserWord[],
  ): WordWithStatistics[] {
    let sorted = sortedWords;
    unSortedwords.forEach((filteredWord: UserWord) => {
      sorted = sorted.map((sortedWord: WordWithStatistics) => {
        if (sortedWord.id === filteredWord.wordId) {
          return {
            ...sortedWord,
            userStats: {
              difficulty: filteredWord.difficulty,
              optional: filteredWord.optional,
            },
          };
        }
        return sortedWord;
      });
    });
    return sorted;
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
    audio.play().catch((err: Error) => {
      console.error(err);
    });
  }

  generateStats(
    gameResults: GameResults,
    gameStreak: number,
    gameName: GameName,
  ): Statistics {
    const correctWords: Array<WordId> = [];
    const incorrectWords: Array<WordId> = [];
    gameResults.correctWords.forEach((word: WordWithStatistics) => {
      correctWords.push({ id: word.id });
    });
    gameResults.incorrectWords.forEach((word: WordWithStatistics) => {
      incorrectWords.push({ id: word.id });
    });
    const statistics: Statistics = {
      correctWords,
      incorrectWords,
      gameName,
      streak: gameStreak,
      date: new Date(Date.now()).toISOString(),
    };
    return statistics;
  }

  toWordsWithStatistics(words: Word[]): WordWithStatistics[] {
    return words.map((elem) => ({
      ...elem,
      userStats: {
        difficulty: 'hard',
        optional: {
          toStudy: {},
          knowledgeDegree: 0,
          page: 'unset',
          group: 'unset',
        },
      },
    }));
  }

  toWordWithStatistics(word: Word): WordWithStatistics {
    return {
      ...word,
      userStats: {
        difficulty: 'hard',
        optional: {
          toStudy: {},
          knowledgeDegree: 0,
          page: 'unset',
          group: 'unset',
        },
      },
    };
  }

  filterWordsByGroupPage(
    words: UserWord[],
    group: string,
    page: string,
  ): UserWord[] {
    return words.filter(
      (word: UserWord) => word.optional.group.toString() === group
      && word.optional.page.toString() === page,
    );
  }
}
