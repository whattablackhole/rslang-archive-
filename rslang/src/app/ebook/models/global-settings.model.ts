import { UserBookSettings } from './user-book-settings.model';

export interface GlobalSettings {
  wordsPerDay: number;
  optional: UserBookSettings;
}
