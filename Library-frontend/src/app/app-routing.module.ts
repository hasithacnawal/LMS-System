import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth-user/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { Page404Component } from './authentication/page404/page404.component';
import { RegisterSuccessComponent } from './authentication/register-success/register-success.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminLayoutComponent } from './layout/app-layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },

      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          role: 'Admin',
        },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'authUser',
        canActivate: [AuthGuard],
        data: {
          role: 'User',
        },
        loadChildren: () =>
          import('./auth-user/auth-user.module').then((m) => m.AuthUserModule),
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'home', component: HomeComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
