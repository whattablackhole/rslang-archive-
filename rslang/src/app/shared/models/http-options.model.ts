import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
}
