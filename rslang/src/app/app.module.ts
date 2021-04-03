import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { App } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MaterialModule,
    NavigationModule,
    SharedModule,
  ],
  bootstrap: [App],
})
export class AppModule {}
