import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookSettingsService } from './services/ebook-settings.service';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { PaginationDirective } from './directives/pagination.directive';
import { EbookTitle } from './components/ebook-title/ebook-title.component';
import { WordsList } from './components/words-list/words-list.component';
import { SettingsService } from './services/settings.service';
import { WordsDataService } from '../shared/services/words-data.service';

@NgModule({
  declarations: [EbookHome, WordsCollections, EbookSettings, EbookTitle, PaginationDirective, WordsList],
  imports: [SharedModule, EbookRoutingModule],
  exports: [WordsCollections],
  providers: [EbookSettingsService, SettingsService, WordsDataService],
})
export class EbookModule {}
