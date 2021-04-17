import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BaseDataService } from '../../core/services/base-data.service';
import { Statistics } from '../../shared/models/statistics-short.model';

@Injectable()
export class GSProviderService extends BaseDataService<Statistics[]> {
  userID: string;
  constructor(httpClient: HttpClient, private authService: AuthService) {
    super(httpClient);
    this.userID = this.authService.getUserId() as string;
  }

  getGameSessions(): Observable<Statistics[]> {
    this.getData(`${BASE_URL}/users/${this.userID}/statistics`);
    return this.data$;
  }
}
