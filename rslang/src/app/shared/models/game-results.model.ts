import { WordWithStatistics } from './word-statistics.model';

export interface GameResults {
  correct_words: WordWithStatistics[];
  incorrect_words: WordWithStatistics[];
}
