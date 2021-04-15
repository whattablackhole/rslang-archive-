import { WordWithStatistics } from './word-statistics.model';

export interface GameResults {
  correctWords: WordWithStatistics[];
  incorrectWords: WordWithStatistics[];
}
