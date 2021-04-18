import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BaseDataService } from '../../core/services/base-data.service';
import { BackEndStatistics } from '../../shared/models/statistics-backend.model';
import { API_URL } from '../../shared/constants/api-url';

@Injectable()
export class GSProviderService extends BaseDataService<BackEndStatistics> {
  userID: string;
  constructor(httpClient: HttpClient, private authService: AuthService) {
    super(httpClient);
    this.userID = this.authService.getUserId() as string;
  }

  getGameSessions(): void {
    this.getData(API_URL.USER_STATISTICS(this.userID));
  }
}
