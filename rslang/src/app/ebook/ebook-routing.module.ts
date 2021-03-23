import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookPageComponent } from './components/ebook-page/ebook-page.component';

const routes: Routes = [{ path: '', component: EbookPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
