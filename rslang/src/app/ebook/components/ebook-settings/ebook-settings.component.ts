import {
  Component, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';

@Component({
  selector: 'app-ebook-settings',
  templateUrl: './ebook-settings.component.html',
  styleUrls: ['./ebook-settings.component.scss'],
})
export class EbookSettings implements OnInit {
  // isUserAuthenticated = this.authService.getUserAuthenticationStatus();
  isUserAuthenticated = true;
  userBookSettings: UserBookSettings;
  name: FormControl = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);

  ebookSettingsSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
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
    console.log(this.userBookSettings);
  }
}
