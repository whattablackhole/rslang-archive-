import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookSettingsService } from './services/ebook-settings.service';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { SettingsService } from './services/settings.service';
import { WordsDataService } from '../shared/services/words-data.service';

@NgModule({
  declarations: [EbookHome, WordsCollections, EbookSettings],
  imports: [SharedModule, EbookRoutingModule, MatInputModule],
  exports: [WordsCollections],
  providers: [EbookSettingsService, SettingsService, WordsDataService],
})
export class EbookModule {}
