import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Audiocall } from './components/audiocall/audiocall.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [Audiocall],
  imports: [CommonModule, AudiocallRoutingModule, SharedModule],
})
export class AudiocallModule {}
