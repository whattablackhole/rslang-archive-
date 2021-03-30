import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudiocallPage } from './components/audiocall-page/audiocall-page.component';

const routes: Routes = [{ path: '', component: AudiocallPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiocallRoutingModule {}
