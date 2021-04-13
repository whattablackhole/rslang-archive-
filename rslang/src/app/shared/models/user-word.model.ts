import { StudyProgress } from 'src/app/ebook/models/study-progress.model';

export interface UserWord {
  difficulty: string; // 'hard' or 'remove'
  optional?: {
    knowledgeDegree?: number;
    toStudy: StudyProgress;
    page: number;
    group:number;
  }
}
