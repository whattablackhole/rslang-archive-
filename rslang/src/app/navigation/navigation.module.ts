import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MaterialModule } from '../material/material.module';
import { SettingsComponent } from './settings/settings.component';
import { DotMenuComponent } from './dot-menu/dot-menu.component';
import { SettingsDialogComponent } from '../navigation/settings-dialog/settings-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavMenuComponent,
    SettingsComponent,
    DotMenuComponent,
    SettingsDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    NavMenuComponent,
    SettingsComponent,
    DotMenuComponent,
    SettingsDialogComponent,
  ],
})
export class NavigationModule {}
