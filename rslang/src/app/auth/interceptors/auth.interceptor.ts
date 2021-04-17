import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthActionService } from '../services/auth-action.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private authActionService: AuthActionService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getJwtToken();
    if (!authToken || req.url.includes('tokens')) {
      return next.handle(req);
    }

    const authRequest = this.addAuthorizationHeader(req, authToken);
    return next.handle(authRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            const refreshToken = this.authService.getRefreshToken();
            const userId = this.authService.getUserId();
            if (refreshToken && userId) {
              this.authActionService.refreshToken(userId, refreshToken);
              // TODO wait for refreshToken
              const newToken = this.authService.getJwtToken();
              console.log('newToken: ', newToken);
              console.log('oldToken: ', authToken);
              if (newToken) {
                const reRequest = this.addAuthorizationHeader(authRequest, newToken);
                return next.handle(reRequest);
              }
              return next.handle(authRequest);
            }
          }

          if (err.status === 403) {
            this.authService.logoutUserWithRedirect();
          }
        }

        return throwError(err);
      }),
    );
  }

  private addAuthorizationHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
