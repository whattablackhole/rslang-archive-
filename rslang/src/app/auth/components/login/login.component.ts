import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss'],
})
export class Login {
  loginForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private authActionService: AuthActionService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailInput(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get passwordInput(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  submitForm(): void {
    this.authActionService.signinUser(this.loginForm.getRawValue());
  }
}
