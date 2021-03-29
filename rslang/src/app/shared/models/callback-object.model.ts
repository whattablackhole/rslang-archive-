import { HttpErrorResponse } from '@angular/common/http';

export interface CallbackObject {
  onSuccess?: (result: unknown) => void;
  onError?: (err: HttpErrorResponse) => void;
  onComplete?: () => void;
}
