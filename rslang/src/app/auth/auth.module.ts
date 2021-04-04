import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPage } from './components/auth-page/auth-page.component';
import { AuthActionService } from './services/auth-action.service';

@NgModule({
  declarations: [AuthPage],
  imports: [CommonModule, AuthRoutingModule, SharedModule, MatCardModule, MatFormFieldModule, MatInputModule],
  providers: [AuthActionService],
})
export class AuthModule {}
