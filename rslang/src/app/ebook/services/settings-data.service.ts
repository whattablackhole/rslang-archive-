import { Injectable } from '@angular/core';
import { GlobalSettings } from '../models/global-settings.model';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class SettingsDataService extends BaseDataService<GlobalSettings> {}
