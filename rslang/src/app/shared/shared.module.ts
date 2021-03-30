import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NotFoundPage } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPage],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule],
})
export class SharedModule {}
