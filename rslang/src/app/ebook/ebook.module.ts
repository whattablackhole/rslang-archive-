import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookSettingsService } from './services/ebook-settings.service';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';

@NgModule({
  declarations: [EbookHome, WordsCollections, EbookSettings],
  imports: [SharedModule, EbookRoutingModule],
  exports: [WordsCollections],
  providers: [EbookSettingsService],
})
export class EbookModule {}
