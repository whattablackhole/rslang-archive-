import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintPage } from './components/sprint-page/sprint-page.component';

const routes: Routes = [{ path: '', component: SprintPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprintRoutingModule {}
