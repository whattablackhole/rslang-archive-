import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookPage } from './components/ebook-page/ebook-page.component';

const routes: Routes = [{ path: '', component: EbookPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
