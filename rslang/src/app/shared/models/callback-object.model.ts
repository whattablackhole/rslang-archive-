import { HttpErrorResponse } from '@angular/common/http';

export interface CallbackObject {
  // eslint-disable-next-line
  onSuccess?: (result: Object) => void;
  onError?: (err: HttpErrorResponse) => void;
  onComplete?: () => void;
}
