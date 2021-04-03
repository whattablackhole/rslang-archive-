import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseActionService } from '../../shared/services/base-action.service';

import { CreateUser } from '../models/create-user.model';

import { BASE_URL } from '../../shared/constants/base-url';

@Injectable()
export class AuthActionService extends BaseActionService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  createUser(newUser: CreateUser): void {
    this.sendAction('POST', `${BASE_URL}/users`, undefined, { body: newUser });
  }
}
