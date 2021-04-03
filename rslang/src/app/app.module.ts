import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from './core/core.module';
import { App } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavMenu } from './components/nav-menu/nav-menu.component';
import { DotMenu } from './components/dot-menu/dot-menu.component';
import { Logo } from './components/logo/logo.component';

@NgModule({
  declarations: [App, NavMenu, DotMenu, Logo],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule],
  bootstrap: [App],
})
export class AppModule {}
