import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../../shared/services/notification.service';
import { EbookProviderService } from '../../services/ebook-provider.service';
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
  previousUrl: string;
  title = 'vocabulary';
  @Input() ebook: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: EbookProviderService,
    private notification: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.previousUrl = this.route.snapshot.paramMap.get('previousUrl') as string;
  }

  goToPage(event: Event): void {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    const { currentState } = JSON.parse(data as string) as UserBookSettings;
    this.providerService.updatedDataSelectionGame({
      fromEbook: true,
      currentState,
    });
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['games', target.id])
      .toString();
    this.router.navigate([path])
      .catch((err) => this.notification.showError(err));
  }

  goToVocabulary(event: Event): void {
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['ebook', target.id])
      .toString();
    this.router.navigate([path])
      .catch((err) => this.notification.showError(err));
  }

  goToEbook(event: Event): void {
    // this.previousUrl = this.route.snapshot.url.join('/');
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['ebook', target.id])
      .toString();
    this.router.navigate([path])
      .catch((err) => this.notification.showError(err));
  }
}
