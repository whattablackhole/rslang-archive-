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
    const dates = new Set(gamesSessions.map((game) => game.date.toLocaleDateString()));
    dates.forEach((date) => {
      const gameGroupByDate = gamesSessions.filter(
        (game) => game.date.toLocaleDateString() === date,
      );
      statistics.push({
        date: gameGroupByDate[0].date,
        gameStatistics: gameGroupByDate.map((item) => this.transformToGameStatistic(item)),
        learnedWords: this.getLearnedWords(gameGroupByDate),
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

  getLearnedWords(gamesSession: GameSession []) : number {
    const correct = new Set(...gamesSession.map((game) => game.correct_words.map((word) => word.id)));
    const incorrect = new Set(...gamesSession.map((game) => game.incorrect_words.map((word) => word.id)));
    const difference = [...correct].filter((wordId) => !incorrect.has(wordId));
    return gamesSession.length < 3 ? 0 : difference.length;
  }
}
