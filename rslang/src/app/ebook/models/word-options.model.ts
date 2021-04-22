import { Word } from '../../shared/models/word.model';
import { StudyProgress } from './study-progress.model';

export interface WordOptions extends Word {
  difficulty?: 'hard' | 'removed' | 'unset',
  optional?: {
    toStudy?: StudyProgress;
    group?: string;
    page?: string;
    knowledgeDegree?: number;
  };
}
