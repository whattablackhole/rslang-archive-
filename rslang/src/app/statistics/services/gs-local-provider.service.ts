import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { GameSession } from '../models/game-session.model';

@Injectable()
export class GSLocalProviderService {
  constructor(private localStorage: LocalStorageService) {
  }

  getGameSessions(): Observable<GameSession[]> {
    const gameSessions : GameSession[] = [];
    Object.assign(gameSessions, JSON.parse(this.localStorage.getItem('GameSession') || '[]'));
    return of(gameSessions);
  }
}
