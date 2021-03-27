import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './navigation/nav-menu/nav-menu.component';
import { SettingsComponent } from './navigation/settings/settings.component';
import { SettingsDialogComponent } from './navigation/settings-dialog/settings-dialog.component';
import { DotMenuComponent } from './navigation/dot-menu/dot-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SettingsComponent,
    SettingsDialogComponent,
    DotMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
