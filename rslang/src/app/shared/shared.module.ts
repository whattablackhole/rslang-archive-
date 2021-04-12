import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotFoundPage } from './components/not-found-page/not-found-page.component';
import { Footer } from './components/footer/footer.component';
import { NotificationBar } from './components/notification/notification-bar.component';
import { FinishMenu } from './components/finish-menu/finish-menu.component';
import { ScreenSizeChanger } from './components/screen-size-changer/screen-size-changer.component';
import { StartAnimation } from './components/start-animation/start-animation.component';
import { RandomizePipe } from './pipes/randomize.pipe';

@NgModule({
  declarations: [NotFoundPage, Footer, NotificationBar, FinishMenu, ScreenSizeChanger, StartAnimation, RandomizePipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    Footer,
    FinishMenu,
    ScreenSizeChanger,
    StartAnimation,
    RandomizePipe,
  ],
  providers: [NotificationBar],
})
export class SharedModule {}
