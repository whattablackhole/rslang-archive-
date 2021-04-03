import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPage } from './shared/components/not-found-page/not-found-page.component';
import { MainPage } from './components/main-page/main-page.component';
import { NavMenu } from './components/nav-menu/nav-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'home',
    component: MainPage,
  },
  {
    path: 'ebook',
    loadChildren: () => import('./ebook/ebook.module').then((m) => m.EbookModule),
  },
  {
    path: 'games',
    children: [
      {
        path: 'audiocall',
        loadChildren: () => import('./games/audiocall/audiocall.module').then(
          (m) => m.AudiocallModule,
        ),
      },
      {
        path: 'savannah',
        loadChildren: () => import('./games/savannah/savannah.module').then(
          (m) => m.SavannahModule,
        ),
      },
      {
        path: 'sprint',
        loadChildren: () => import('./games/sprint/sprint.module').then((m) => m.SprintModule),
      },
    ],
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
