import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserBookSettings } from '../../models/user-book-settings.model';

@Component({
  selector: 'app-ebook-settings',
  templateUrl: './ebook-settings.component.html',
  styleUrls: ['./ebook-settings.component.scss'],
})
export class EbookSettings {
  isUserAuthenticated = false;
  @Input() userBookSettings: UserBookSettings;
  @Output() bookSettingsChanged: EventEmitter<UserBookSettings> = new EventEmitter<UserBookSettings>();

  onSubmit(settingsForm: NgForm): void {
    if (settingsForm.invalid) {
      return;
    }
    this.bookSettingsChanged.emit(this.userBookSettings);
  }
}
