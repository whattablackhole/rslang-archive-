import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GetWordDataService } from '../shared/services/word.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [GetWordDataService],
})
export class SharedModule {}
