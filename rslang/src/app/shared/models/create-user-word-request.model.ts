import { StudyProgress } from '../../ebook/models/study-progress.model';
import { ButtonAction } from '../types/button-action.type';

export interface CreateUserWordRequest {
  difficulty: ButtonAction;
  optional: {
    knowledgeDegree?: number;
    toStudy?: StudyProgress;
    page?: string;
    group?: string;
  }
}
