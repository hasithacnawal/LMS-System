import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUserRoutingModule } from './auth-user-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthUserRoutingModule
  ]
})
export class AuthUserModule { }
