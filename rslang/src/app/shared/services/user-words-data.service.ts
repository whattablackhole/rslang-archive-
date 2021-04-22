import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from '../../core/services/base-data.service';
import { UserWord } from '../models/user-word.model';

@Injectable()
export class UserWordsDataService extends BaseDataService<UserWord[]> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
