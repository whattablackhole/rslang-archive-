import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class UserAggregatedWordsService extends BaseDataService<WordWithStatistics[]> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
