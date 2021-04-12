import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Savannah } from './components/savannah/savannah.component';

const routes: Routes = [{ path: '', component: Savannah }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavannahRoutingModule {}
