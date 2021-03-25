import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudiocallPageComponent } from './components/audiocall-page/audiocall-page.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [AudiocallPageComponent],
  imports: [CommonModule, AudiocallRoutingModule],
})
export class AudiocallModule {}
