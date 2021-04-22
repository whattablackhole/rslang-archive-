import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
