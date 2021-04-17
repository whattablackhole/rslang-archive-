import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { BackEndStatistics } from '../../shared/models/statistics-backend.model';

@Injectable()
export class GSLocalProviderService {
  data$: Observable<BackEndStatistics>;
  private subject = new Subject<BackEndStatistics>();
  constructor(private localStorage: LocalStorageService) {
    this.data$ = this.subject.asObservable();
  }

  getGameSessions() {
    const gameSessions : BackEndStatistics = { id: 'undefined', optional: { stats: [] } };
    Object.assign(gameSessions, JSON.parse(this.localStorage.getItem('statistics') || '[]'));
    this.subject.next(gameSessions);
  }
}
