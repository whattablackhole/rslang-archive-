import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { EbookRoutingModule } from './ebook-routing.module';
import { EbookHome } from './components/ebook-page/ebook-home.component';
import { Collections } from './components/collections/collections.component';

@NgModule({
  declarations: [EbookHome, Collections],
  imports: [SharedModule, EbookRoutingModule, HttpClientModule],
})
export class EbookModule {}
