import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthActionService } from '../services/auth-action.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private authActionService: AuthActionService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('req: ', req);
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
              console.log('subs0');
              this.authActionService.refreshToken(userId, refreshToken);

              let updateTokenSubscription = new Subscription();
              updateTokenSubscription = this.authService
                .updateTokenListener()
                .subscribe((newToken) => {
                  console.log('subs1', newToken);
                  const reRequest = this.addAuthorizationHeader(authRequest, newToken);
                  console.log('handle: ', reRequest);
                  updateTokenSubscription.unsubscribe();
                  return next.handle(reRequest);
                });
              /* () => {
                  console.log('subs2');
                  return next.handle(authRequest);
                },
                () => {
                  console.log('subs3');
                  updateTokenSubscription.unsubscribe();
                }); */
              /*
                // TODO wait for refreshToken
              const newToken = this.authService.getJwtToken();
              console.log('newToken: ', newToken);
              console.log('oldToken: ', authToken);
              if (newToken) {
                const reRequest = this.addAuthorizationHeader(authRequest, newToken);
                return next.handle(reRequest);
              }
              return next.handle(authRequest); */
            }
          }

          if (err.status === 403) {
            this.authService.logoutUserWithRedirect();
          }
        }
        console.log('throw');
        return throwError(err);
      }),
    );
  }

  private addAuthorizationHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
