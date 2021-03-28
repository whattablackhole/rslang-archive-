import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookHome } from './components/ebook-page/ebook-home.component';
import { WordsCollections } from './components/collections/words-collections.component';
import { ListWords } from './components/list-words/list-words.component';

const routes: Routes = [
  { path: '', component: EbookHome },
  { path: 'page', component: WordsCollections },
  { path: 'id', component: ListWords },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
