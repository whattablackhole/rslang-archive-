import { Observable, Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';
import { HttpAction } from '../types/http-action.type';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseActionService<T> {
  constructor(private httpClient: HttpClient) {}
  private subject = new Subject<T>();
  data$!: Observable<T>;
  postData(method: HttpAction, path: string, options?: HttpOptions): void {
    this.data$ = this.subject.asObservable();
    this.httpClient
      .request<T>(method, BASE_URL + path, options)
      .subscribe((data) => {
        this.subject.next(data);
      });
  }
}
