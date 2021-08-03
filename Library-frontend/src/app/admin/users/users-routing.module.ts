import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  {
    path: 'allUsers',
    component: AllUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
