import {
  Component,
  OnInit,
} from '@angular/core';

import { EbookSettingsService } from '../../services/ebook-settings.service';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
})
export class EbookHome implements OnInit {
  constructor(
    private ebookSettingsService: EbookSettingsService,
  ) {}

  ngOnInit(): void {
    this.ebookSettingsService.load();
  }
}
