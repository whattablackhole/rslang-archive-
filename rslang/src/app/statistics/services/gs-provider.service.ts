import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDataService } from '../../core/services/base-data.service';
import { GameSession } from '../models/game-session.model';

@Injectable()
export class GSProviderService extends BaseDataService<GameSession[]> {
  url = 'address';
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getGameSessions(): Observable<GameSession[]> {
    this.getData(this.url);
    return this.data$;
  }
}
