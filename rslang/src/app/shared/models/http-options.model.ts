import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Word } from './word.model';

export interface HttpOptions {
  body?: Word | Word[];
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
}
