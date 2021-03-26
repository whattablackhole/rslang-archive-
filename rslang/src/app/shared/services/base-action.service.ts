import { Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';
import { HttpAction } from '../types/http-action.type';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseActionService<T> {
  responseSubject$ = new Subject<T>();

  constructor(private httpClient: HttpClient) {
    this.responseSubject$.asObservable();
  }

  postData(method: HttpAction, path: string, options?: HttpOptions): void {
    this.httpClient
      .request<T>(method, BASE_URL + path, options)
      .subscribe((data) => {
        this.responseSubject$.next(data);
      });
  }
}
