import { Subject } from 'rxjs';
import { HttpOptions } from '../models/http-options.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseDataService<T> {
  dataSubject$ = new Subject<T>();

  constructor(private httpClient: HttpClient) {
    this.dataSubject$.asObservable();
  }

  getData(path: string, options?: HttpOptions): void {
    this.httpClient.get<T>(BASE_URL + path, options).subscribe((data) => {
      this.dataSubject$.next(data);
    });
  }
}
