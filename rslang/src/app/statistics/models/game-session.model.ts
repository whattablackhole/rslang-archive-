export interface GameSession {
  game_id?: string;
  date: Date;
  name: string;
  correct_words: Array<WordId>;
  incorrect_words: Array<WordId>;
  streak: number;
}

interface WordId {
  id: string;
}
