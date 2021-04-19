import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseActionService } from '../../core/services/base-action.service';
import { NotificationService } from '../../shared/services/notification.service';
import { CallbackObject } from '../../shared/models/callback-object.model';
import { GlobalSettings } from '../models/global-settings.model';
import { API_URL } from '../../shared/constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class SettingsActionService extends BaseActionService {
  constructor(
    httpClient: HttpClient,
    private notifyService: NotificationService,
  ) {
    super(httpClient);
  }

  upsertSettings(userId: string, settings: GlobalSettings): void {
    const { notifyService } = this;
    const action: CallbackObject = {
      onError(err) {
        const message = (err.status === 400)
          ? 'Bad request'
          : 'Please try again.';
        notifyService.showError(message);
      },
    };
    this.sendAction('PUT', API_URL.USER_SETTINGS(userId), action, { body: settings });
  }
}
