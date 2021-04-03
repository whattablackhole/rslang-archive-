import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NotFoundPage } from './components/not-found-page/not-found-page.component';
import { Footer } from './components/footer/footer.component';
@NgModule({
  declarations: [NotFoundPage, Footer],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [CommonModule, Footer, FormsModule],
})
export class SharedModule {}
