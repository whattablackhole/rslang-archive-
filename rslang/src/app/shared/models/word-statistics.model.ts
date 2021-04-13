// import { StudyProgress } from 'src/app/ebook/models/study-progress.model';
import { UserWord } from './user-word.model';
import { Word } from './word.model';

export interface WordWithStatistics extends Word {
  // isDifficult: boolean;
  // isRemove: boolean;
  // toStudy: StudyProgress;
  // knowledgeDegree: number;
  userOption: UserWord;
}
