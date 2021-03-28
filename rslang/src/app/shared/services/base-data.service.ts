import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { GLOBAL_DATA } from '../constants/api-url';
import { Options } from '../models/optionss.model';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  // data$: Observable<T>;
  // private dataSubject = new Subject<T>();

  constructor(private httpClient: HttpClient) {
    // this.data$ = this.dataSubject.asObservable();
  }

  getData(request: string, options?: Options): Observable<T> {
    const params = new HttpParams()
      .set('group', String(options.group))
      .set('page', String(options.page));

    return this.httpClient.get<T>(GLOBAL_DATA.WORDS, { params: params });
    // .subscribe((data: T) => {
    //   this.dataSubject.next(data);
    // });
  }
}
