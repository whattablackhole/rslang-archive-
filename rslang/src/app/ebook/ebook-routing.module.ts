import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookHeader } from './components/ebook-header/ebook-header.component';
import { EbookHome } from './components/ebook-home/ebook-home.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';
import { WordsCollections } from './components/words-collections/words-collections.component';
import { WordsList } from './components/words-list/words-list.component';

const routes: Routes = [
  {
    path: '',
    component: EbookHome,
    children: [
      { path: 'group', component: WordsCollections },
      { path: 'group/:id', component: WordsList },
      { path: 'settings', component: EbookSettings },
      { path: '', component: EbookHeader, outlet: 'ebook-header' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
