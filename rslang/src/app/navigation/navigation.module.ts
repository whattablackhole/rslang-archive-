import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MaterialModule } from '../material/material.module';
import { SettingsComponent } from './settings/settings.component';
import { DotMenuComponent } from './dot-menu/dot-menu.component';
@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  exports: [NavMenuComponent, SettingsComponent, DotMenuComponent],
})
export class NavigationModule {}
