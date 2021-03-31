import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { EbookSettingsInitService } from './services/ebook-settings-init.service';

export function initializeEbookSettings(ebookSettingsInitService: EbookSettingsInitService) {
  return (): Promise<unknown> => ebookSettingsInitService.Init();
}

@NgModule({
  declarations: [EbookHome, WordsCollections, EbookSettings],
  imports: [SharedModule, EbookRoutingModule],
  exports: [WordsCollections],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: initializeEbookSettings, deps: [EbookSettingsInitService], multi: true,
    },
  ],
})
export class EbookModule {}
