import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenu } from './nav-menu/nav-menu.component';
import { Settings } from './settings/settings.component';
import { DotMenu } from './dot-menu/dot-menu.component';
import { SettingsDialog } from './settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [NavMenu, Settings, DotMenu, SettingsDialog],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [
    NavMenu,
    Settings,
    DotMenu,
    SettingsDialog,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class NavigationModule {}
