import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalSettings } from '../models/global-settings.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class SettingsService extends BaseDataService<GlobalSettings> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
