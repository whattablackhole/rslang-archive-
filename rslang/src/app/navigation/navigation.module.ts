import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenu } from './nav-menu/nav-menu.component';
import { MaterialModule } from '../material/material.module';
import { Settings } from './settings/settings.component';
import { DotMenu } from './dot-menu/dot-menu.component';
import { SettingsDialog } from './settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [NavMenu, Settings, DotMenu, SettingsDialog],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavMenu, Settings, DotMenu, SettingsDialog],
})
export class NavigationModule {}
