import { Observable, Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseDataService<T> {
  constructor(private httpClient: HttpClient) {}
  private subject = new Subject<T>();
  data$!: Observable<T>;
  getData(path: string, options?: HttpOptions): void {
    this.data$ = this.subject.asObservable();
    this.httpClient.get<T>(BASE_URL + path, options).subscribe((data) => {
      this.subject.next(data);
    });
  }
}
