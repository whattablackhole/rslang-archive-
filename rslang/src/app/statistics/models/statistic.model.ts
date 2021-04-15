import { GameStatistic } from './game-statistic.model';

export interface Statistic {
  date: Date;
  gameStatistics: Array<GameStatistic>;
  learnedWords?: number;
}
