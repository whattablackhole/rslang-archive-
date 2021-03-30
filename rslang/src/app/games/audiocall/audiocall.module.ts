import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudiocallPage } from './components/audiocall-page/audiocall-page.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [AudiocallPage],
  imports: [CommonModule, AudiocallRoutingModule],
})
export class AudiocallModule {}
