import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAggregatedData } from '../models/user-aggregated-data.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class UserAggregatedWordsService extends BaseDataService<UserAggregatedData> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
