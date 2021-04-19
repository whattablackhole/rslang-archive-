import { Injectable } from '@angular/core';
import { NotificationBar } from '../components/notification/notification-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notificationBar: NotificationBar) { }

  showSuccess(message: string): void {
    this.notificationBar.openSnackBar(message, 'green-snackbar');
  }

  showError(message: string): void {
    this.notificationBar.openSnackBar(message, 'red-snackbar');
  }
}
