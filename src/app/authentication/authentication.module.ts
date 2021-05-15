import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [Page404Component],
  imports: [CommonModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
