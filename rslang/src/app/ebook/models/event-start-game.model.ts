import { CurrentStateBook } from './current-state-book.model';

export interface EventStartGame {
  fromEbook: boolean;
  currentState?: CurrentStateBook;
}
