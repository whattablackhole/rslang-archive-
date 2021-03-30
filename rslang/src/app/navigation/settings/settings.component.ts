import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialog } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class Settings {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(SettingsDialog);
  }
}
