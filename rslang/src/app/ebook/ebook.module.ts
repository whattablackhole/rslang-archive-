import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EbookPage } from './components/ebook-page/ebook-page.component';
import { EbookRoutingModule } from './ebook-routing.module';

@NgModule({
  declarations: [EbookPage],
  imports: [CommonModule, EbookRoutingModule],
})
export class EbookModule {}
