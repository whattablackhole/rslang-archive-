import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { SigninResponse } from '../models/signin-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_ID = 'UserId';
  private readonly JWT_TOKEN = 'Token';
  private readonly REFRESH_TOKEN = 'RefreshToken';

  private isUserAuthenticated = false;
  private authStatus = new Subject<boolean>();

  constructor(
    private router: Router,
    private storage: LocalStorageService,
  ) {}

  getIsUserAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  loginUser(data: SigninResponse): void {
    this.saveAuthData(data.userId, data.token, data.refreshToken);
    this.changeAuthStatus(true);
    this.redirectToUrl('/');
  }

  logoutUser(): void {
    this.clearAuthData();
    this.changeAuthStatus(false);
  }

  changeAuthStatus(isLogin: boolean): void {
    this.isUserAuthenticated = isLogin;
    this.authStatus.next(isLogin);
  }

  getJwtToken(): string | null {
    return this.storage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(this.REFRESH_TOKEN);
  }

  getUserId(): string | null {
    return this.storage.getItem(this.USER_ID);
  }

  redirectToUrl(url: string): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate([url]); // TODO catch error
  }

  private saveAuthData(userId: string, token: string, refreshToken: string): void {
    this.storage.setItem(this.USER_ID, userId);
    this.storage.setItem(this.JWT_TOKEN, token);
    this.storage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private clearAuthData(): void {
    this.storage.removeItem(this.USER_ID);
    this.storage.removeItem(this.JWT_TOKEN);
    this.storage.removeItem(this.REFRESH_TOKEN);
  }
}
