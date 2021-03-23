import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavannahPageComponent } from './components/savannah-page/savannah-page.component';

const routes: Routes = [{ path: '', component: SavannahPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavannahRoutingModule {}
