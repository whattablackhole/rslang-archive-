import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { UserWord } from 'src/app/shared/models/user-word.model';
import { Statistics } from 'src/app/shared/models/statistics-short.model';
import { WordId } from 'src/app/shared/types/word-id.type';
import { BackEndStatistics } from 'src/app/shared/models/statistics-backend.model';
import { GameName } from '../../shared/types/game-name.type';
import { WordsByPages } from '../interfaces/words-by-pages.model';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class GameCoreService {
  constructor(private localStorageService: LocalStorageService, private notifyService: NotificationService) {}

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
    const backEndStats: BackEndStatistics = { id: 'undefined', optional: { stats: [stats] } };
    let result: BackEndStatistics | string | null = this.localStorageService.getItem(
      'statistics',
    );
    if (result) {
      try {
        result = JSON.parse(result) as BackEndStatistics;
      } catch {
        result = null;
      }
    }
    if ((result as BackEndStatistics)) {
      (result as BackEndStatistics).optional.stats.push(stats);
      this.localStorageService.setItem('statistics', JSON.stringify(result));
    } else {
      this.localStorageService.setItem('statistics', JSON.stringify(backEndStats));
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

  addStudyStats(words: WordWithStatistics[], gameResultWords: GameResults): WordWithStatistics[] {
    const resultLength: number = gameResultWords.correctWords.length;
    let sortedWords: WordWithStatistics[] = words;
    sortedWords = sortedWords.map((item: WordWithStatistics) => {
      const newItem = item;
      const currentTotal: number = newItem.userStats.optional.toStudy.actualStats[0].total;
      newItem.userStats.optional.toStudy = { actualStats: [{ successfully: resultLength, total: currentTotal + 1 }] };
      return newItem;
    });
    return sortedWords;
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
      this.notifyService.showError(err.message);
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
        difficulty: 'unset',
        optional: {
          toStudy: { actualStats: [{ successfully: 0, total: 0 }] },
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
        difficulty: 'unset',
        optional: {
          toStudy: { actualStats: [{ successfully: 0, total: 0 }] },
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
