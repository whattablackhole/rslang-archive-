import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCoreService } from '../services/game-core.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { Sprint } from './components/sprint/sprint.component';

@NgModule({
  declarations: [Sprint],
  imports: [CommonModule, SprintRoutingModule, SharedModule, CountdownModule],
  exports: [],
  providers: [GameCoreService],
})
export class SprintModule {}
