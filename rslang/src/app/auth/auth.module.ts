import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthPage } from './components/auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthActionService } from './services/auth-action.service';

@NgModule({
  declarations: [AuthPage],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [AuthActionService],
})
export class AuthModule {}
