import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sprint',
    loadChildren: () => import('./sprint/sprint.module').then((m) => m.SprintModule),
  },
  {
    path: 'audiocall',
    loadChildren: () => import('./audiocall/audiocall.module').then((m) => m.AudiocallModule),
  },
  {
    path: 'savannah',
    loadChildren: () => import('./savannah/savannah.module').then((m) => m.SavannahModule),
  },
  {
    path: 'match-pairs',
    loadChildren: () => import('./match-pairs/match-pairs.module').then((m) => m.MatchPairsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
