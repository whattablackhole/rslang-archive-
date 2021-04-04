import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { Vocabulary } from './components/vocabulary/vocabulary.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { EbookRoutingModule } from './ebook-routing.module';

@NgModule({
  declarations: [EbookHome, WordsCollections, EbookSettings, Vocabulary],
  imports: [SharedModule, EbookRoutingModule, MatTabsModule],
  exports: [WordsCollections],
})
export class EbookModule {}
