import { CardState } from './card-state.type';

export interface CardData{
  id: string,
  word: string,
  translation: string,
  state: CardState; 
}
