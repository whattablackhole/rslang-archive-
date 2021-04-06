import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Audiocall } from './components/audiocall/audiocall.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [Audiocall],
  imports: [CommonModule, AudiocallRoutingModule],
})
export class AudiocallModule {}
