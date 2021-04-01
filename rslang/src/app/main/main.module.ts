import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { Team } from './team/team';
@NgModule({
  declarations: [MainPage, Team],
  imports: [CommonModule, MainRoutingModule, SharedModule, MaterialModule],
})
export class MainModule {}
