import { Word } from '../../shared/models/word.model';
import { StudyProgress } from './study-progress.model';

export interface WordWithStatistics extends Word {
  isDifficult: boolean;
  isRemove: boolean;
  toStudy: StudyProgress;
}
