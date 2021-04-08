import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { NotFoundPage } from './components/not-found-page/not-found-page.component';
import { Footer } from './components/footer/footer.component';
import { FinishMenu } from './components/finish-menu/finish-menu.component';
import { ScreenSizeChanger } from './components/screen-size-changer/screen-size-changer.component';
import { StartAnimation } from './components/start-animation/start-animation.component';
import { RandomizePipe } from './pipes/randomize.pipe';

@NgModule({
  declarations: [NotFoundPage, Footer, FinishMenu, ScreenSizeChanger, StartAnimation, RandomizePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    Footer,
    FinishMenu,
    ScreenSizeChanger,
    StartAnimation,
    RandomizePipe,
  ],
})
export class SharedModule {}
