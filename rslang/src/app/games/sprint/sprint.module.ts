import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameCoreService } from '../services/game-core.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { Sprint } from './components/sprint/sprint.component';
import { FinishMenu } from '../components/finish-menu/finish-menu.component';
import { StartAnimation } from '../components/start-animation/start-animation.component';
import { ScreenSizeChanger } from '../components/screen-size-changer/screen-size-changer.component';

@NgModule({
  declarations: [Sprint, FinishMenu, StartAnimation, ScreenSizeChanger],
  imports: [CommonModule, SprintRoutingModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [FinishMenu],
  providers: [GameCoreService],
})
export class SprintModule {}
