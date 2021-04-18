import { CurrentStateBook } from './current-state-book.model';
import { CheckboxItem } from './checkbox-item.model';

export interface UserBookSettings {
  currentState: CurrentStateBook;
  buttonOptions: CheckboxItem[];
  wordOptions: CheckboxItem[];
  userName: string;
}
