import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CallbackObject } from '../../shared/models/callback-object.model';
import { BaseActionService } from '../../shared/services/base-action.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { BASE_URL } from '../../shared/constants/base-url';

import { CreateUser } from '../models/create-user.model';
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

  createUser(newUser: CreateUser, authService = this.authService): void {
    const action: CallbackObject = {
      onSuccess() {
        authService.redirectToUrl('/auth');
      },
      // TODO catch error
    };
    this.sendAction('POST', `${BASE_URL}/users`, action, { body: newUser });
  }

  signinUser(user: SigninRequest, authService = this.authService): void {
    const action: CallbackObject = {
      onSuccess(result) {
        authService.loginUser(result as SigninResponse);
      },
      // TODO catch error
    };
    this.sendAction('POST', `${BASE_URL}/signin`, action, { body: user });
  }
}
