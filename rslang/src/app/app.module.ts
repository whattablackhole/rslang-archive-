import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, NavigationModule, SharedModule],
  bootstrap: [App],
})
export class AppModule {}
