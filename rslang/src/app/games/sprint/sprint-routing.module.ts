import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintPageComponent } from './components/sprint-page/sprint-page.component';

const routes: Routes = [{ path: '', component: SprintPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprintRoutingModule {}
