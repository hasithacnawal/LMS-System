import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LockedComponent } from './locked/locked.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    Page404Component,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    LockedComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
