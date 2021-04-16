import { Component } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss'],
})
export class Login {
  loginForm: FormGroup;

  emailInput: FormControl;
  passwordInput: FormControl;

  constructor(private readonly fb: FormBuilder, private authActionService: AuthActionService) {
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required]);

    this.loginForm = this.fb.group({
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  submitForm(): void {
    this.authActionService.signinUser(this.loginForm.getRawValue());
  }
}
