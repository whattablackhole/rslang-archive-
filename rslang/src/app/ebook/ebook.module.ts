import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WordsDataService } from '../shared/services/words-data.service';
import { SharedModule } from '../shared/shared.module';
import { EbookHeader } from './components/ebook-header/ebook-header.component';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { GameSidenav } from './components/game-sidenav/game-sidenav.component';
import { WordItem } from './components/word-item/word-item.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { WordsList } from './components/words-list/words-list.component';
import { PaginationDirective } from './directives/pagination.directive';
import { EbookRoutingModule } from './ebook-routing.module';
import { FilterByActionPipe } from './pipes/filter-by-action.pipe';
import { EbookProviderService } from './services/ebook-provider.service';
import { UsersWordsDataService } from './services/users-words-data.service';
import { Vocabulary } from './components/vocabulary/vocabulary.component';
import { ShowLabelHardWordDirective } from './directives/show-label-hard-word.directive';
import { EbookSettingsService } from './services/ebook-settings.service';
import { SettingsActionService } from './services/settings-action.service';
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
    FilterByActionPipe,
    GameSidenav,
    Vocabulary,
    ShowLabelHardWordDirective,
  ],
  imports: [
    SharedModule,
    EbookRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatTabsModule,
  ],
  exports: [WordsCollections],
  providers: [
    EbookSettingsService,
    SettingsDataService,
    WordsDataService,
    SettingsActionService,
    EbookProviderService,
    UsersWordsDataService,
  ],
})
export class EbookModule {}
