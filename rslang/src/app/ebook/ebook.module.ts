import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { EbookHomeComponent } from './components/ebook-page/ebook-home.component';
import { EbookRoutingModule } from './ebook-routing.module';
import { CollectionsComponent } from './components/collections/collections.component';

@NgModule({
  declarations: [EbookHomeComponent, CollectionsComponent],
  imports: [SharedModule, EbookRoutingModule, HttpClientModule],
})
export class EbookModule {}
