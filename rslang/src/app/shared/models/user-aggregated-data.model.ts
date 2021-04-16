import { WordWithStatistics } from './word-statistics.model';
import { Word } from './word.model';

export interface UserAggregatedData {
  [index: number]: { paginatedResults:(WordWithStatistics & Word)[] };
}
