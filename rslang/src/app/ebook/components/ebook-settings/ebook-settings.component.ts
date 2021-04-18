import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsActionService } from '../../services/settings-action.service';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';

@Component({
  selector: 'app-ebook-settings',
  templateUrl: './ebook-settings.component.html',
  styleUrls: ['./ebook-settings.component.scss'],
})
export class EbookSettings implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  userBookSettings: UserBookSettings;
  name: FormControl = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);

  ebookSettingsSubscription: Subscription;
  usernameSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private settingsActionService: SettingsActionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getUserAuthenticationStatus();
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.ebookSettingsSubscription = this.localStorageService.changes$
      .subscribe(
        (events: StorageChanges) => {
          if (events.type === LocalStorageType.Set && events.key === LocalStorageKey.EbookSettings as string) {
            this.userBookSettings = JSON.parse(events.value as string) as UserBookSettings;
          }
        },
      );
  }

  onSubmit(): void {
    this.usernameSubscription = this.name.valueChanges
      .subscribe((results: string) => {
        this.userBookSettings.userName = results;
      });
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));

    const userId = this.isUserAuthenticated
      ? this.authService.getUserId()
      : 'unauthenticated';

    if (this.isUserAuthenticated) {
      this.settingsActionService.upsertSettings(
        userId as string,
        {
          wordsPerDay: 20,
          optional: { ...this.userBookSettings },
        },
      );
    }
  }

  goToPage(): Promise<boolean> {
    const path = this
      .router
      .createUrlTree([''], { relativeTo: this.route })
      .toString();
    return this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.ebookSettingsSubscription.unsubscribe();
    if (this.isUserAuthenticated) {
      this.usernameSubscription.unsubscribe();
    }
  }
}
