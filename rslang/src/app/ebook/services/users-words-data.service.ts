import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsersWords } from '../../shared/models/users-words.model';
import { API_URL } from '../../shared/constants/api-url';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class UsersWordsDataService extends BaseDataService<UsersWords[]> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllUsersWords(userId: string): void {
    this.getData(API_URL.USER_WORDS(userId));
  }
}
