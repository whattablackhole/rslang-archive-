import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseActionService } from 'src/app/core/services/base-action.service';

@Injectable()
export class StatisticsActionService extends BaseActionService {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
