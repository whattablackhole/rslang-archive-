import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookSettingsService } from './services/ebook-settings.service';
import { SettingsDataService } from './services/settings-data.service';
import { WordsDataService } from '../shared/services/words-data.service';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { PaginationDirective } from './directives/pagination.directive';
import { EbookHeader } from './components/ebook-header/ebook-header.component';
import { WordsList } from './components/words-list/words-list.component';
import { WordItem } from './components/word-item/word-item.component';
import { FilterByActionPipe } from './pipes/filter-by-action.pipe';
import { GameSidenav } from './components/game-sidenav/game-sidenav.component';
import { SettingsActionService } from './services/settings-action.service';
import { EbookProviderService } from './services/ebook-provider.service';

@NgModule({
  declarations: [
    EbookHome,
    WordsCollections,
    EbookSettings,
    EbookHeader,
    WordsList,
    WordItem,
    PaginationDirective,
    FilterByActionPipe,
    GameSidenav,
  ],
  imports: [
    SharedModule,
    EbookRoutingModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
  ],
  exports: [WordsCollections],
  providers: [
    EbookSettingsService,
    SettingsDataService,
    WordsDataService,
    SettingsActionService,
    EbookProviderService,
  ],
})
export class EbookModule {}
