import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { NotificationService } from '../../shared/services/notification.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { SigninResponse } from '../models/signin-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_ID = 'UserId';
  private readonly USER_NAME = 'UserName';
  private readonly JWT_TOKEN = 'Token';
  private readonly REFRESH_TOKEN = 'RefreshToken';

  private authStatus = new Subject<boolean>();
  private jwtToken = new Subject<string>();

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private notification: NotificationService,
  ) {}

  getUserAuthenticationStatus(): boolean {
    return !!this.getJwtToken();
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  updateTokenListener(): Observable<string> {
    return this.jwtToken.asObservable();
  }

  loginUser(data: SigninResponse): void {
    this.saveAuthData(data.userId, data.name, data.token, data.refreshToken);
    this.changeAuthStatus(true);
    this.redirectToUrl('/');
  }

  logoutUser(): void {
    this.clearAuthData();
    this.changeAuthStatus(false);
    this.notification.showSuccess('You are signed out!');
  }

  logoutUserWithRedirect(): void {
    this.logoutUser();
    this.redirectToUrl('/auth');
    this.notification.showError('Token expired! Please enter your credentials.');
  }

  changeAuthStatus(isLogin: boolean): void {
    this.authStatus.next(isLogin);
  }

  updateTokens(token: string, refreshToken: string): void {
    this.storage.setItem(this.JWT_TOKEN, token);
    this.storage.setItem(this.REFRESH_TOKEN, refreshToken);
    this.jwtToken.next(token);
  }

  autoLoginUser(): void {
    if (this.getJwtToken()) {
      this.changeAuthStatus(true);
    }
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

  getUserName(): string | null {
    return this.storage.getItem(this.USER_NAME);
  }

  redirectToUrl(url: string): void {
    this.router.navigate([url])
      .catch((err) => this.notification.showError(err));
  }

  private saveAuthData(userId: string, name: string, token: string, refreshToken: string): void {
    this.storage.setItem(this.USER_ID, userId);
    this.storage.setItem(this.USER_NAME, name);
    this.storage.setItem(this.JWT_TOKEN, token);
    this.storage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private clearAuthData(): void {
    this.storage.removeItem(this.USER_ID);
    this.storage.removeItem(this.USER_NAME);
    this.storage.removeItem(this.JWT_TOKEN);
    this.storage.removeItem(this.REFRESH_TOKEN);
  }
}
