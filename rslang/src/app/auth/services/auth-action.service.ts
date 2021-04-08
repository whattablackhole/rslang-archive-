import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  ) {
    super(httpClient);
  }

  createUser(req: CreateUserRequest, authService = this.authService): void {
    const action: CallbackObject = {
      onSuccess() {
        authService.redirectToUrl('/auth');
      },
      // TODO catch error
    };
    this.sendAction('POST', `${BASE_URL}/users`, action, { body: req });
  }

  signinUser(req: SigninRequest, authService = this.authService): void {
    const action: CallbackObject = {
      onSuccess(result) {
        authService.loginUser(result as SigninResponse);
      },
      // TODO catch error
    };
    this.sendAction('POST', `${BASE_URL}/signin`, action, { body: req });
  }
}
