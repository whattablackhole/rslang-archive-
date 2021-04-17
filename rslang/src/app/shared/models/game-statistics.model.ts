import { GameName } from '../types/game-name.type';

export interface GameStatistics {
  correct_words: Array<{ id: string }>;
  incorrect_words: Array<{ id: string }>;
  date: string;
  game_name: GameName;
  streak: number;
}
