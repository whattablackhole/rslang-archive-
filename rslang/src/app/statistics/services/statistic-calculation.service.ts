import { Injectable } from '@angular/core';
import { GameSession } from '../models/game-session.model';
import { Statistic } from '../models/statistic.model';
import { GameStatistic } from '../models/game-statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticCalculationService {
  transformToGameStatistic(gamesSession: GameSession): GameStatistic {
    return {
      name: gamesSession.name,
      winrate: this.getWinrate(gamesSession),
      rightWords: this.getRightWords(gamesSession),
      streak: gamesSession.streak,
    };
  }

  groupByDate(gamesSessions: GameSession[]): Statistic[] {
    const statistics: Statistic[] = [];
    const dates = new Set(gamesSessions.map((game) => game.date));
    dates.forEach((date) => {
      const gameGroupByDate = gamesSessions.filter(
        (game) => game.date.toLocaleDateString() === date.toLocaleDateString(),
      );
      statistics.push({
        date,
        gameStatistics: gameGroupByDate.map((item) => this.transformToGameStatistic(item)),
      });
    });
    return statistics;
  }

  getWinrate(gamesSession: GameSession): number {
    const allWords = gamesSession.correct_words.length + gamesSession.incorrect_words.length;
    return (gamesSession.correct_words.length / allWords) * 100;
  }

  getRightWords(gamesSession: GameSession): number {
    return gamesSession.correct_words.length;
  }
}
