import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameCoreService } from '../services/game-core.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { Sprint } from './components/sprint/sprint.component';

@NgModule({
  declarations: [Sprint],
  imports: [CommonModule, SprintRoutingModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, SharedModule],
  exports: [],
  providers: [GameCoreService],
})
export class SprintModule {}
