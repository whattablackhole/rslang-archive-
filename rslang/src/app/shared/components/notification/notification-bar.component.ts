import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-bar.component.html',
})
export class NotificationBar {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, className: string): void {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      panelClass: [className],
    });
  }
}
