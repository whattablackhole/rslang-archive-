import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
})
export class DotMenu implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.IsUserAuthenticated();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logoutUser();
  }
}
