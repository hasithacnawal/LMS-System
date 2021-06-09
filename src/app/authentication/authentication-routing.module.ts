import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockedComponent } from './locked/locked.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },

  {
    path: 'locked',
    component: LockedComponent,
  },
  {
    path: 'page404',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
