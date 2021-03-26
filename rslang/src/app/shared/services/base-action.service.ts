import { Observable, Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';
import { HttpAction } from '../types/http-action.type';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseActionService<T> {
  subject = new Subject<T>();
  response$: Observable<T>;

  constructor(private httpClient: HttpClient) {
    this.response$ = this.subject.asObservable();
  }

  postData(method: HttpAction, path: string, options?: HttpOptions): void {
    this.httpClient
      .request<T>(method, BASE_URL + path, options)
      .subscribe((data) => {
        this.subject.next(data);
      });
  }
}
