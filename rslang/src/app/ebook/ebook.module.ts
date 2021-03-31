import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EbookRoutingModule } from './ebook-routing.module';

import { EbookHome } from './pages/ebook-home/ebook-home.component';
import { WordsCollections } from './components/words-collections/words-collections.component';

@NgModule({
  declarations: [EbookHome, WordsCollections],
  imports: [SharedModule, EbookRoutingModule],
  exports: [WordsCollections],
})
export class EbookModule {}
