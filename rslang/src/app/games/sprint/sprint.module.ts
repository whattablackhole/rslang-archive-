import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCoreService } from '../services/game-core.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { Sprint } from './components/sprint/sprint.component';

@NgModule({
  declarations: [Sprint],
  imports: [CommonModule, SprintRoutingModule, SharedModule],
  exports: [],
  providers: [GameCoreService],
})
export class SprintModule {}
