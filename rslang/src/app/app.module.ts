import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { DotMenu } from './components/dot-menu/dot-menu.component';
import { Logo } from './components/logo/logo.component';
import { Main } from './components/main/main';
import { NavMenu } from './components/nav-menu/nav-menu.component';
import { Team } from './components/team/team';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App, NavMenu, DotMenu, Logo, Team, Main],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
