import { Injectable } from '@angular/core';
import { GameStatistic } from '../models/game-statistic.model';

@Injectable({
  providedIn: 'root',
})
export class GamesAggregationService {
  aggregation(games: Array<GameStatistic>): Array<GameStatistic> {
    const aggregatedGames: Array<GameStatistic> = [];
    const names = new Set(games.map((game) => game.name));
    names.forEach((name) => {
      const uniqueNamedGames = games.filter((game) => game.name === name);
      const aggregatedGame = uniqueNamedGames.reduce((a, b) => {
        const c: GameStatistic = {
          name: a.name,
          winrate: a.winrate + b.winrate,
          streak: Math.max(a.streak, b.streak),
        };
        return c;
      });
      aggregatedGame.winrate /= uniqueNamedGames.length;
      aggregatedGames.push(aggregatedGame);
    });
    return aggregatedGames;
  }
}
