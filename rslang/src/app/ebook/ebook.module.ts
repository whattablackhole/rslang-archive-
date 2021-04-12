import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { WordsDataService } from '../shared/services/words-data.service';
import { SharedModule } from '../shared/shared.module';
import { EbookHeader } from './components/ebook-header/ebook-header.component';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { WordItem } from './components/word-item/word-item.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { WordsList } from './components/words-list/words-list.component';
import { PaginationDirective } from './directives/pagination.directive';
import { EbookRoutingModule } from './ebook-routing.module';
import { EbookSettingsService } from './services/ebook-settings.service';
import { SettingsDataService } from './services/settings-data.service';

@NgModule({
  declarations: [
    EbookHome,
    WordsCollections,
    EbookSettings,
    EbookHeader,
    WordsList,
    WordItem,
    PaginationDirective,
  ],
  imports: [SharedModule, EbookRoutingModule, MatInputModule],
  exports: [WordsCollections],
  providers: [EbookSettingsService, SettingsDataService, WordsDataService],
})
export class EbookModule {}
