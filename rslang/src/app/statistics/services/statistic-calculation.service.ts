import { Injectable } from '@angular/core';
import { GlobalStatistic } from '../models/statistic.model';
import { GameStatistic } from '../models/game-statistic.model';
import { Statistics } from '../../shared/models/statistics-short.model';

@Injectable()
export class StatisticCalculationService {
  transformToGameStatistic(gamesSession: Statistics): GameStatistic {
    return {
      name: gamesSession.gameName,
      winrate: this.getWinRate(gamesSession),
      rightWords: this.getRightWords(gamesSession),
      streak: gamesSession.streak,
    };
  }

  groupByDate(gamesSessions: Statistics[]): GlobalStatistic[] {
    const statistics: GlobalStatistic[] = [];
    const dates = new Set(gamesSessions.map((game) => (this.getStringDate(game.date))));
    dates.forEach((date) => {
      const gameGroupByDate = gamesSessions.filter(
        (game) => (this.getStringDate(game.date) === date),
      );
      statistics.push({
        date: this.getDate(gameGroupByDate[0].date),
        gameStatistics: gameGroupByDate.map((item) => this.transformToGameStatistic(item)),
        learnedWords: this.getLearnedWords(gameGroupByDate),
      });
    });
    return statistics;
  }

  getStringDate(gameDate: string | Date) : string {
    return typeof gameDate === 'string'
      ? new Date(gameDate).toLocaleDateString()
      : gameDate.toLocaleDateString();
  }

  getDate(gameDate: string | Date) : Date {
    return typeof gameDate === 'string'
      ? new Date(gameDate)
      : gameDate;
  }

  getWinRate(gamesSession: Statistics): number {
    const allWords = gamesSession.correctWords.length + gamesSession.incorrectWords.length;
    return (gamesSession.correctWords.length / allWords) * 100;
  }

  getRightWords(gamesSession: Statistics): number {
    return gamesSession.correctWords.length;
  }

  getLearnedWords(gamesSession: Statistics []) : number {
    const correct = new Set(...gamesSession.map((game) => game.correctWords.map((word) => word.id)));
    const incorrect = new Set(...gamesSession.map((game) => game.correctWords.map((word) => word.id)));
    const difference = [...correct].filter((wordId) => !incorrect.has(wordId));
    return gamesSession.length < 3 ? 0 : difference.length;
  }
}
