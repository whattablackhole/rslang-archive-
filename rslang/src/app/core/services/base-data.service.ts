import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpOptions } from '../models/http-options.model';

export abstract class BaseDataService<T> {
  data$: Observable<T>;
  private subject = new Subject<T>();

  constructor(public httpClient: HttpClient) {
    this.data$ = this.subject.asObservable();
  }

  getData(path: string, options?: HttpOptions): void {
    this.httpClient.get<T>(path, options)
      .subscribe((data: T) => {
        this.subject.next(data);
      }, (error: HttpErrorResponse) => {
        console.log('Does not find info');
      });
  }
}
