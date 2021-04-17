import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { BackEndStatistics } from '../models/statistics-backend.model';

@Injectable()
export class StatisticsDataService extends BaseDataService <BackEndStatistics> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
