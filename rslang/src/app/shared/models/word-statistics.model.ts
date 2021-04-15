import { Word } from './word.model';
import { UserStats } from './word-stats.model';

export interface WordWithStatistics extends Word {
  userStats: UserStats
}

