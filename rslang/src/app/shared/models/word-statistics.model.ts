import { StudyProgress } from 'src/app/ebook/models/study-progress.model';
import { ButtonAction } from '../types/button-action.type';
import { Word } from './word.model';

export interface WordWithStatistics extends Word {
  isDifficult: boolean;
  isRemove: boolean;
  toStudy: StudyProgress;
  knowledgeDegree: number;
}

export interface WordAndStatistics extends Word {
  difficulty?: ButtonAction;
  optional?: {
    knowledgeDegree?: number;
    toStudy?: StudyProgress;
    page?: string;
    group?: string;
  }
}
