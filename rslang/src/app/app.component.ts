import { Component, OnInit } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App implements OnInit {
  moduleLoading = false;
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart
       || event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel),
    ).subscribe((event) => {
      this.moduleLoading = event instanceof NavigationStart;
    });
  }

  ngOnInit(): void {
    this.authService.autoLoginUser();
  }
}
