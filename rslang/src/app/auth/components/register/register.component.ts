import { Component } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss'],
})
export class Register {
  authForm: FormGroup;

  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;

  constructor(private readonly fb: FormBuilder, private authActionService: AuthActionService) {
    const pwdPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_@$!%*?&#.,;:]).{8,}$');

    this.nameInput = new FormControl('', [Validators.required, Validators.maxLength(200)]);
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required, Validators.pattern(pwdPattern)]);

    this.authForm = this.fb.group({
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  submitForm(): void {
    this.authActionService.createUser(this.authForm.getRawValue());
  }
}
