import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { Main } from './components/main/main';
import { Team } from './team/team';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [Main, Team],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatIconModule, MatButtonModule, MatCardModule],
  exports: [CommonModule, SharedModule, MatIconModule, MatButtonModule, MatCardModule],
})
export class MainModule {}
