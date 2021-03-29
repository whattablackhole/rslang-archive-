import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { App } from './app.component';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, MaterialModule, NavigationModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
