import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudiocallPageComponent } from './components/audiocall-page/audiocall-page.component';

const routes: Routes = [{ path: '', component: AudiocallPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiocallRoutingModule {}
