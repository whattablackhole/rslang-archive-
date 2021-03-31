import { Component, Input } from '@angular/core';

import { CheckboxItem } from '../../models/checkbox-item.model';

@Component({
  selector: 'app-ebook-settings',
  templateUrl: './ebook-settings.component.html',
  styleUrls: ['./ebook-settings.component.scss'],
})
export class EbookSettings {
  isUserAuthenticated = false;
  @Input() wordOptions: CheckboxItem[];
  @Input() buttonOptions: CheckboxItem[];
}
