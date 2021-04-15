import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificatService {
  showMessage(message: string): void {
    console.error(message, 'green-snackbar');
  }
}
