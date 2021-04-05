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

@Injectable()
export class AuthActionService extends BaseActionService {
  constructor(
    httpClient: HttpClient,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    super(httpClient);
  }

  createUser(newUser: CreateUser): void {
    this.sendAction('POST', `${BASE_URL}/users`, undefined, { body: newUser });
  }

  signinUser(user: SigninRequest, router = this.router, storage = this.storage): void {
    const action: CallbackObject = {
      onSuccess(result) {
        const signinData = result as SigninResponse;
        storage.setItem('userId', signinData.userId);
        storage.setItem('token', signinData.token);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.navigate(['/']); // TODO catch error
      },
      // TODO catch error
    };
    this.sendAction('POST', `${BASE_URL}/signin`, action, { body: user });
  }
}
