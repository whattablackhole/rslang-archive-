import { GameStatistic } from './game-statistic.model';
import { WordStatistic } from './word-statistic.model';

export interface Statistic {
  date: Date;
  games: Array<GameStatistic>;
  learnedWords: Array<WordStatistic>;
}
