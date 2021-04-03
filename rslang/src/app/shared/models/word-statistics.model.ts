import { Word } from './word.model';

export interface WordWithStatistics extends Word {
  isDifficult: boolean;
  isRemove: boolean;
  // toStudy: StudyProgress;
  knowledgeDegree: number;
}
