import { GameResults } from './game-results.model';
import { GameName } from '../types/game-name.type';

export interface Statistics extends GameResults {
  date: string;
  game_name: GameName;
  streak: number;
}
