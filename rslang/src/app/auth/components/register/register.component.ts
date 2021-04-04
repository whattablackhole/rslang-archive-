import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthActionService } from '../../services/auth-action.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss'],
})
export class Register {
  constructor(private authActionService: AuthActionService) {}

  onSubmit(form: NgForm): void {
    this.authActionService.createUser(form.value);
  }
}
