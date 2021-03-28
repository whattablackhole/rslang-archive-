import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookHome } from './components/ebook-page/ebook-home.component';
import { Collections } from './components/collections/collections.component';
import { ListWords } from './components/list-words/list-words.component';

const routes: Routes = [
  { path: '', component: EbookHome },
  { path: 'page', component: Collections },
  { path: 'id', component: ListWords },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
