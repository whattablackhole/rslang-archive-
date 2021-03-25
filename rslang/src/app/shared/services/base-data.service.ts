import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Options } from '../models/options.model';
import { GLOBAL_DATA } from '../constants/api-url';
import { NUMBER_RETRIES_OF_REQUESTS } from '../constants/number-requests';

interface RoutesMap {
  [index: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  private dataDSabject = new Subject<T>();
  wordsData$!: Observable<T>;

  constructor(private httpClient: HttpClient) {}

  getData(request: RoutesMap, options?: Options): void {
    this.wordsData$ = this.dataDSabject.asObservable();
    this.httpClient
      .get<T>(GLOBAL_DATA.WORDS, options)
      // .get<T>(GLOBAL_DATA[request], options)
      // .pipe(retry(NUMBER_RETRIES_OF_REQUESTS));
      .subscribe((data) => {
        this.dataDSabject.next(data);
      });
  }
}
