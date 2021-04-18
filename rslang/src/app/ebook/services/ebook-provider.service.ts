import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EventStartGame } from '../models/event-start-game.model';

@Injectable({
  providedIn: 'root',
})
export class EbookProviderService {
  private dataSource = new BehaviorSubject<EventStartGame>({ fromEbook: false });
  eventStartGame$ = this.dataSource.asObservable();

  updatedDataSelectionGame(StartGame: EventStartGame): void {
    this.dataSource.next(StartGame);
  }
}
