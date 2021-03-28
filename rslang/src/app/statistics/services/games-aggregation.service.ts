import { Injectable } from '@angular/core';
import { GameStatistic } from '../models/statistic.model';

@Injectable({
  providedIn: 'root',
})
export class GamesAggregationService {
  aggregation(games: Array<GameStatistic>): Array<GameStatistic> {
    let aggregatedGames: Array<GameStatistic> = [];
    let names = new Set(games.map((game) => game.name));
    names.forEach((name) => {
      let uniqueNamedGames = games.filter((game) => game.name === name);
      let aggregatedGame = uniqueNamedGames.reduce((a, b) => {
        let c: GameStatistic = {
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
