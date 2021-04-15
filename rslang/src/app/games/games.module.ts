import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GamesPage } from './components/games-page/games-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, GameRoutingModule, SharedModule],
  declarations: [GamesPage],
})
export class GamesModule {}
