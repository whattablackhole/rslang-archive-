import { Observable, Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';

export abstract class BaseDataService<T> {
  data$: Observable<T>;
  private subject = new Subject<T>();
  abstract getPath: Function;

  constructor(private httpClient: HttpClient) {
    this.data$ = this.subject.asObservable();
  }

  getData(getPath: Function, options?: HttpOptions): void {
    this.httpClient.get<T>(getPath(), options).subscribe((data: T) => {
      this.subject.next(data);
    });
  }
}
