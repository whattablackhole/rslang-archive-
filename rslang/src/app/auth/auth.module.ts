import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthActionService } from './services/auth-action.service';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';

@NgModule({
  declarations: [Login, Register],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [AuthActionService],
})
export class AuthModule {}
