import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss'],
})
export class Login {
  constructor(private authActionService: AuthActionService) {}

  onSubmit(form: NgForm): void {
    this.authActionService.signinUser(form.value);
  }
}
