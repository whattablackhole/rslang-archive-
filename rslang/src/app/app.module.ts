import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
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
    SharedModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  bootstrap: [App],
})
export class AppModule {}
