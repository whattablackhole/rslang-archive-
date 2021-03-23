import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EbookPageComponent } from './components/ebook-page/ebook-page.component';
import { EbookRoutingModule } from './ebook-routing.module';

@NgModule({
  declarations: [EbookPageComponent],
  imports: [CommonModule, EbookRoutingModule],
})
export class EbookModule {}
