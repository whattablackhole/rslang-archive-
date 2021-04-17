import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpOptions } from 'src/app/core/models/http-options.model';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { BackEndStatistics } from '../models/statistics-backend.model';

@Injectable()
export class StatisticsDataService extends BaseDataService <BackEndStatistics[]> {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getFullData(path: string, options?: HttpOptions): Observable<BackEndStatistics | string> {
    return this.httpClient.get<BackEndStatistics>(path, options).pipe(catchError(() => of('unset')));
  }
}
