import { GameStatistic } from './game-statistic.model';

export interface GlobalStatistic {
  date: Date;
  gameStatistics: Array<GameStatistic>;
  learnedWords?: number;
}
