import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from './components/footer/footer.component';
import { NotFoundPage } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPage, Footer],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [CommonModule, FormsModule, Footer],
})
export class SharedModule {}
