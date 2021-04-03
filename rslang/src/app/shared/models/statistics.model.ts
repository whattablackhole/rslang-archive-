import { GameResults } from './game-results.model';

export interface Statistics extends GameResults {
  date: Date;
  game_name: string;
  streak: number;
}
