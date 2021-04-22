import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersWords } from 'src/app/shared/models/users-words.model';

import { EventStartGame } from '../models/event-start-game.model';
import { OptionsChecked } from '../models/options-checked.model';
import { WordOptions } from '../models/word-options.model';

@Injectable({
  providedIn: 'root',
})
export class EbookProviderService {
  private dataSource = new BehaviorSubject<EventStartGame>({ fromEbook: false });
  eventStartGame$ = this.dataSource.asObservable();

  private dataWords = new BehaviorSubject<WordOptions[]>([]);
  eventEbookWords$ = this.dataWords.asObservable();

  private dataSettings = new BehaviorSubject<OptionsChecked>({});
  eventOptionsSetting$ = this.dataSettings.asObservable();

  private userWords = new BehaviorSubject<UsersWords[]>([]);
  eventUserWords$ = this.userWords.asObservable();

  updatedDataSelectionGame(startGame: EventStartGame): void {
    this.dataSource.next(startGame);
  }

  updatedDataViewsWords(words: WordOptions[]): void {
    this.dataWords.next(words);
  }

  updatedOptionSettings(settings: OptionsChecked): void {
    this.dataSettings.next(settings);
  }

  updatedUserWords(words:UsersWords[]): void {
    this.userWords.next(words);
  }
}
