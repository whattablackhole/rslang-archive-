import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getJwtToken();
    if (!authToken) {
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authRequest);
  }
}
