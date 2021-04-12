import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sprint } from './components/sprint/sprint.component';

const routes: Routes = [{ path: '', component: Sprint }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprintRoutingModule {}
