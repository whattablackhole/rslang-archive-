import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from '../../shared/services/notification.service';
import { CallbackObject } from '../../shared/models/callback-object.model';
import { BaseActionService } from '../../core/services/base-action.service';
import { BASE_URL } from '../../shared/constants/base-url';

import { CreateUserRequest } from '../models/create-user-request.model';
import { SigninRequest } from '../models/signin-request.model';
import { SigninResponse } from '../models/signin-response.model';
import { AuthService } from './auth.service';

@Injectable()
export class AuthActionService extends BaseActionService {
  constructor(
    httpClient: HttpClient,
    private authService: AuthService,
    private notifyService: NotificationService,
  ) {
    super(httpClient);
  }

  createUser(req: CreateUserRequest, authService = this.authService, notifyService = this.notifyService): void {
    const action: CallbackObject = {
      onSuccess() {
        authService.redirectToUrl('/auth');
        notifyService.showSuccess('Registration was successful!');
      },
      onError(err) {
        const message = (err.status === 417)
          ? 'User with this e-mail already exists'
          : 'Sign up error! Please try again.';
        notifyService.showError(message);
      },
    };
    this.sendAction('POST', `${BASE_URL}/users`, action, { body: req });
  }

  signinUser(req: SigninRequest, authService = this.authService, notifyService = this.notifyService): void {
    const action: CallbackObject = {
      onSuccess(result) {
        authService.loginUser(result as SigninResponse);
        notifyService.showSuccess('You are logged in!');
      },
      onError(error) {
        let message = '';
        switch (error.status) {
          case 403:
            message = 'Password is incorrect!';
            break;
          case 404:
            message = 'User is not found!';
            break;
          default:
            message = 'Sign in error! Please try again.';
        }

        notifyService.showError(message);
      },
    };
    this.sendAction('POST', `${BASE_URL}/signin`, action, { body: req });
  }
}
