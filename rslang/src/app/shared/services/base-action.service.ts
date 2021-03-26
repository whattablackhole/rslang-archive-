import { HttpOptions } from '../models/http-options.model';
import { callbackObject } from '../models/callback-object.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpAction } from '../types/http-action.type';
import { BASE_URL } from '../constants/base-url';

export abstract class BaseActionService {
  abstract path: string;
  abstract callbackObject: callbackObject;
  constructor(private httpClient: HttpClient) {}

  postData(
    method: HttpAction,
    callbackObject?: callbackObject,
    options?: HttpOptions
  ): void {
    let callback: callbackObject;
    if (callbackObject) {
      callback = callbackObject;
    } else {
      callback = this.callbackObject;
    }
    this.httpClient.request(method, BASE_URL + this.path, options).subscribe(
      (value: Object) => {
        callback.onSuccess(value);
      },
      (err: HttpErrorResponse) => {
        callback.onError(err);
      },
      () => {
        if (callback.onComplete) {
          callback.onComplete();
        }
      }
    );
  }
}
