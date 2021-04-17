import { GameName } from '../types/game-name.type';
import { WordId } from '../types/word-id.type';

export interface Statistics {
  correctWords: Array<WordId>;
  incorrectWords: Array<WordId>;
  date: string;
  gameName: GameName;
  streak: number;
}
