import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchPairs } from './components/match-pairs/match-pairs.component';

const routes: Routes = [{ path: '', component: MatchPairs }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchPairsRoutingModule {}
