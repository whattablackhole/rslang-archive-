import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EbookHome } from './components/ebook-home/ebook-home.component';
import { WordsList } from './components/words-list/words-list.component';
import { EbookSettings } from './components/ebook-settings/ebook-settings.component';

const routes: Routes = [
  { path: '', component: EbookHome },
  { path: 'group/:id', component: WordsList },
  { path: 'settings', component: EbookSettings },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EbookRoutingModule {}
