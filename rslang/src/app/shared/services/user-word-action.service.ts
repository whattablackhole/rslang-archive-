import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseActionService } from '../../core/services/base-action.service';
import { NotificationService } from './notification.service';
import { CallbackObject } from '../models/callback-object.model';
import { CreateUserWordRequest } from '../models/create-user-word-request.model';
import { API_URL } from '../constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class UserWordActionService extends BaseActionService {
  constructor(
    httpClient: HttpClient,
    private notifyService: NotificationService,
  ) {
    super(httpClient);
  }

  createUserWord(userId: string, wordId: string, word: CreateUserWordRequest): void {
    const { notifyService } = this;
    const action: CallbackObject = {
      onError(err) {
        const message = (err.status === 400)
          ? 'Bad request'
          : 'Please try again.';
        notifyService.showError(message);
      },
    };
    this.sendAction('POST', API_URL.USER_WORD_BY_ID(userId, wordId), action, { body: word });
  }

  updateUserWord(userId: string, wordId: string, word: CreateUserWordRequest): void {
    const { notifyService } = this;
    const action: CallbackObject = {
      onError(err) {
        const message = (err.status === 400)
          ? 'Bad request'
          : 'Please try again.';
        notifyService.showError(message);
      },
    };
    this.sendAction('PUT', API_URL.USER_WORD_BY_ID(userId, wordId), action, { body: word });
  }

  deleteUserWord(userId: string, wordId: string): void {
    const { notifyService } = this;
    const action: CallbackObject = {
      onSuccess() {
        const message = 'The word has been deleted';
        notifyService.showSuccess(message);
      },
      onError(err) {
        const message = (err.status === 401)
          ? 'Access token is missing or invalid'
          : 'Please try again.';
        notifyService.showError(message);
      },
    };
    this.sendAction('PUT', API_URL.USER_WORD_BY_ID(userId, wordId), action);
  }
}
