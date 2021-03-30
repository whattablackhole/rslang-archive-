import { WordStatistic } from './word-statistic.model';
import { GameStatistic } from './game-statistic.model';

export interface Statistic {
  date: Date;
  games: Array<GameStatistic>;
  learnedWords: Array<WordStatistic>;
}
