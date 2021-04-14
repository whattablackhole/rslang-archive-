import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';

export interface WordsByPages {
  page: number;
  words: WordWithStatistics[];
}
