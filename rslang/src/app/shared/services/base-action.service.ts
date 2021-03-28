import { HttpOptions } from '../models/http-options.model';
import { callbackObject } from '../models/callback-object.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpAction } from '../types/http-action.type';

export abstract class BaseActionService {
  abstract getPath: Function;
  constructor(private httpClient: HttpClient) {}

  sendAction(
    method: HttpAction,
    callbackObject?: callbackObject,
    options?: HttpOptions
  ): void {
    this.httpClient.request(method, this.getPath(), options).subscribe(
      (value: Object) => {
        if (callbackObject && callbackObject.onSuccess) {
          callbackObject.onSuccess(value);
        }
      },
      (err: HttpErrorResponse) => {
        if (callbackObject && callbackObject.onError) {
          callbackObject.onError(err);
        } else {
          throw new Error(err.name);
        }
      },
      () => {
        if (callbackObject && callbackObject.onComplete) {
          callbackObject.onComplete();
        }
      }
    );
  }
}
