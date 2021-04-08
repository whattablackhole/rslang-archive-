import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss'],
})
export class Register {
  authForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private authActionService: AuthActionService) {
    const pwdPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_@$!%*?&#.,;:]).{8,}$');
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(pwdPattern)]],
    });
  }

  get nameInput(): AbstractControl | null {
    return this.authForm.get('name');
  }

  get emailInput(): AbstractControl | null {
    return this.authForm.get('email');
  }

  get passwordInput(): AbstractControl | null {
    return this.authForm.get('password');
  }

  submitForm(): void {
    this.authActionService.createUser(this.authForm.getRawValue());
  }
}
