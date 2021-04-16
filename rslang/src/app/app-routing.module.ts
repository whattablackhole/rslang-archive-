import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPage } from './shared/components/not-found-page/not-found-page.component';
import { NavMenu } from './components/nav-menu/nav-menu.component';
import { Main } from './components/main/main';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: Main,
  },
  {
    path: 'ebook',
    loadChildren: () => import('./ebook/ebook.module').then((m) => m.EbookModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: NavMenu,
    outlet: 'nav-menu',
  },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
