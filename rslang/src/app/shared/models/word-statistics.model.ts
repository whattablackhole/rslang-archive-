import { Word } from './word.model';
import { StudyProgress } from '../../ebook/models/study-progress.model';
import { ButtonAction } from '../types/button-action.type';
import { UserStats } from './word-stats.model';

export interface WordWithStatistics extends Word {
  userStats: UserStats
}

export interface WordAndStatistics extends Word {
  difficulty: ButtonAction;
  optional: {
    knowledgeDegree?: number;
    toStudy?: StudyProgress;
    page?: string;
    group?: string;
  }
}
