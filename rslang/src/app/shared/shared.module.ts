import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FinishMenu } from './components/finish-menu/finish-menu.component';
import { Footer } from './components/footer/footer.component';
import { GameStartSettings } from './components/game-start-settings/game-start-settings.component';
import { NotFoundPage } from './components/not-found-page/not-found-page.component';
import { NotificationBar } from './components/notification/notification-bar.component';
import { ScreenSizeChanger } from './components/screen-size-changer/screen-size-changer.component';
import { StartAnimation } from './components/start-animation/start-animation.component';
import { RandomizePipe } from './pipes/randomize.pipe';


@NgModule({
  declarations: [
    NotFoundPage,
    Footer,
    NotificationBar,
    FinishMenu,
    ScreenSizeChanger,
    StartAnimation,
    RandomizePipe,
    GameStartSettings,
  ],
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
    MatGridListModule,
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
    MatGridListModule,
    MatExpansionModule,
    MatSnackBarModule,
    Footer,
    FinishMenu,
    ScreenSizeChanger,
    StartAnimation,
    RandomizePipe,
    GameStartSettings,
  ],
  providers: [NotificationBar],
})
export class SharedModule {}
