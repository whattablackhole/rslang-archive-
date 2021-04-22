import { GameResult } from './game-result.model';

export interface StudyProgress {
  [propName: string]: GameResult[];
}
