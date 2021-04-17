import { StudyProgress } from 'src/app/ebook/models/study-progress.model';

export interface UserStats {
  difficulty: 'hard' | 'removed' | 'unset',
  optional: {
    toStudy: StudyProgress;
    group: string;
    page: string;
    knowledgeDegree: number;
  };
}
