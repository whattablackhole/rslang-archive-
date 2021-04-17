import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { BackEndStatistics } from '../../shared/models/statistics-backend.model';

@Injectable()
export class GSLocalProviderService {
  constructor(private localStorage: LocalStorageService) {
  }

  getGameSessions(): Observable<BackEndStatistics> {
    const gameSessions : BackEndStatistics = { id: 'undefined', optional: { stats: [] } };
    Object.assign(gameSessions, JSON.parse(this.localStorage.getItem('statistics') || '[]'));
    return of(gameSessions);
  }
}
