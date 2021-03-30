import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPage } from './components/auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [AuthPage],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
