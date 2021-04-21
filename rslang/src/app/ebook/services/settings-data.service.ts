import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalSettings } from '../models/global-settings.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class SettingsDataService extends BaseDataService<GlobalSettings> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
