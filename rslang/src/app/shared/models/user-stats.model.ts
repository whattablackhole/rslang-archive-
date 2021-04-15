import { StudyProgress } from '../../ebook/models/study-progress.model';
import { ButtonAction } from '../types/button-action.type';

export interface UserStats {
  id?: string;
  wordId?: string;
  difficulty: ButtonAction;
  optional: {
    knowledgeDegree?: number;
    toStudy?: StudyProgress;
    page?: string;
    group?: string;
  }
}
