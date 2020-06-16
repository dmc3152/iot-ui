import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
