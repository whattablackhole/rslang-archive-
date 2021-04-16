import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Audiocall } from './components/audiocall/audiocall.component';

const routes: Routes = [{ path: '', component: Audiocall }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiocallRoutingModule {}
