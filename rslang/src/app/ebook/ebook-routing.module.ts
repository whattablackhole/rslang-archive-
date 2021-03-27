import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookHomeComponent } from './components/ebook-page/ebook-home.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ListWordsComponent } from './components/list-words/list-words.component';

const routes: Routes = [
  { path: '', component: EbookHomeComponent },
  { path: 'page', component: CollectionsComponent },
  { path: 'id', component: ListWordsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
