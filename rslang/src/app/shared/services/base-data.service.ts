import { Observable, Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseDataService<T> {
  data$: Observable<T>;
  private subject = new Subject<T>();
  abstract path: string;

  constructor(private httpClient: HttpClient) {
    this.data$ = this.subject.asObservable();
  }

  getData(options?: HttpOptions): void {
    this.httpClient
      .get<T>(BASE_URL + this.path, options)
      .subscribe((data: T) => {
        this.subject.next(data);
      });
  }
}
