import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpOptions } from '../models/http-options.model';
import { CallbackObject } from '../../shared/models/callback-object.model';
import { HttpAction } from '../../shared/types/http-action.type';

export abstract class BaseActionService {
  constructor(private httpClient: HttpClient) {}

  sendAction(method: HttpAction, path: string, callbackObject?: CallbackObject, options?: HttpOptions): void {
    this.httpClient.request(method, path, options).subscribe(
      // eslint-disable-next-line
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
      },
    );
  }
}
