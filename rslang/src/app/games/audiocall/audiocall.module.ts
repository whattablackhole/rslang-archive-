import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Audiocall } from './components/audiocall/audiocall.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';
import { RandomizePipe } from './pipes/randomize.pipe';
@NgModule({
  declarations: [Audiocall, RandomizePipe],
  imports: [CommonModule, AudiocallRoutingModule, MatButtonModule, MatProgressSpinnerModule, SharedModule],
})
export class AudiocallModule {}
