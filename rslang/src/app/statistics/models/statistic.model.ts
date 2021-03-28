export interface Statistic {
  date: Date;
  games: Array<GameStatistic>;
  learnedWords: Array<WordStatistic>;
}

export interface GameStatistic {
  name: string;
  winrate: number;
  streak: number;
}

interface WordStatistic {
  id: string;
  group: number;
  page: number;
}
