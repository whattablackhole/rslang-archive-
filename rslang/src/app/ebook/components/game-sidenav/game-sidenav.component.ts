import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EbookDataService } from '../../services/ebook-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
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
    private dateService: EbookDataService,
    private localStorageService: LocalStorageService,
  ) {}

  goToPage(event: Event): Promise<boolean> {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    const { currentState } = JSON.parse(data as string) as UserBookSettings;
    this.dateService.updatedDataSelectionGame({
      fromEbook: true,
      currentState,
    });
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
