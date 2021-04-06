import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
})
export class DotMenu implements OnInit, OnDestroy {
  isUserAuthenticated = false;

  private authStatusSubscriber!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuthenticated();
    this.authStatusSubscriber = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  onLogout(): void {
    this.authService.logoutUser();
  }
}
