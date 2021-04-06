import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EbookRoutingModule } from './ebook-routing.module';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsCollections } from './components/collections/words-collections.component';

@NgModule({
  declarations: [EbookHome, WordsCollections],
  imports: [SharedModule, EbookRoutingModule],
})
export class EbookModule {}
