import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserBookSettings } from '../../models/user-book-settings.model';

@Component({
  selector: 'app-game-sidenav',
  templateUrl: './game-sidenav.component.html',
  styleUrls: ['./game-sidenav.component.scss'],
})
export class GameSidenav {
  userBookSettings: UserBookSettings;
  constructor(
    private router: Router,
  ) {}

  goToPage(event: Event): Promise<boolean> {
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['games', target.id])
      .toString();
    return this.router.navigate([path]);
  }

  goToVocabulary(event: Event): number {
    return 1;
  }
}
