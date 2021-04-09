import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { UserBookSettings } from '../../models/user-book-settings.model';

@Component({
  selector: 'app-ebook-settings',
  templateUrl: './ebook-settings.component.html',
  styleUrls: ['./ebook-settings.component.scss'],
})
export class EbookSettings {
  isUserAuthenticated = true;
  @Input() userBookSettings: UserBookSettings;
  @Output() bookSettingsChanged: EventEmitter<UserBookSettings> = new EventEmitter<UserBookSettings>();

  onSubmit(): void {
    this.bookSettingsChanged.emit(this.userBookSettings);
  }
}
