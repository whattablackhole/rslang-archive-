import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { NotFoundPage } from './components/not-found-page/not-found-page.component';
import { Footer } from './components/footer/footer.component';
import { Error } from './components/error/error.component';

@NgModule({
  declarations: [NotFoundPage, Footer, Error],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    Footer,
  ],
})
export class SharedModule {}
