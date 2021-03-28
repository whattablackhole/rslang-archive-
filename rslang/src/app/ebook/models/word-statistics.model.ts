import { Word } from '../../shared/models/word.model';

export interface WordWithStatistics extends Word {
  isDifficult: boolean;
  isRemove: boolean;
  toStudy: Progress;
}

interface Progress {
  [propName: string]: Result[];
}

interface Result {
  update: number;
  total: number;
  successfully: number;
}
