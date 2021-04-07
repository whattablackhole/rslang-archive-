import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss'],
})
export class Register {
  authForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private authActionService: AuthActionService) {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
