import { Component } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App {
  moduleLoading = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.moduleLoading = true;
      } else if (
        event instanceof NavigationEnd || // eslint-disable-line operator-linebreak
        event instanceof NavigationCancel || // eslint-disable-line operator-linebreak
        event instanceof NavigationError
      ) {
        this.moduleLoading = false;
      }
    });
  }
}
