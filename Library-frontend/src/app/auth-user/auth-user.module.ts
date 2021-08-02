import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUserRoutingModule } from './auth-user-routing.module';
import { HomeComponent } from './home/home.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AuthUserRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],
})
export class AuthUserModule {}
