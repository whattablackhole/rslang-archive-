import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { EbookPageComponent } from './components/ebook-page/ebook-page.component';
import { EbookRoutingModule } from './ebook-routing.module';

@NgModule({
  declarations: [EbookPageComponent],
  imports: [SharedModule, EbookRoutingModule, HttpClientModule],
})
export class EbookModule {}
