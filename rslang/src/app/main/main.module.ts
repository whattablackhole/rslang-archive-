import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TeamComponent } from './team/team';

@NgModule({
  declarations: [MainPageComponent, TeamComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}
