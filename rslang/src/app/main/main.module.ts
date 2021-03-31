import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}
