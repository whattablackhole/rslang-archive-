import { InstantiateExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App {
  moduleLoading = false;
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart
       || event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel),
    ).subscribe((event) => {
      this.moduleLoading = event instanceof NavigationStart;
    });
  }
}
