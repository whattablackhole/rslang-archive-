import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Statistics } from '../../shared/models/statistics-short.model';

@Injectable()
export class GSLocalProviderService {
  constructor(private localStorage: LocalStorageService) {
  }

  getGameSessions(): Observable<Statistics[]> {
    const gameSessions : Statistics[] = [];
    Object.assign(gameSessions, JSON.parse(this.localStorage.getItem('statistics') || '[]'));
    return of(gameSessions);
  }
}
