import { UserStats } from './word-stats.model';

export interface UserWord extends UserStats {
  id: string,
  userId: string,
  wordId: string,
}
