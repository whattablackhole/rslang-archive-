import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPage {
  constructor(private authActionService: AuthActionService) {}

  onSubmit(form: NgForm): void {
    this.authActionService.createUser(form.value);
  }
}
