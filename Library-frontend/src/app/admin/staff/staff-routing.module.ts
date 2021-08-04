import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberComponent } from './add-member/add-member.component';
import { AllMembersComponent } from './all-members/all-members.component';

const routes: Routes = [
  {
    path: 'allMembers',
    component: AllMembersComponent,
  },
  {
    path: 'addMember',
    component: AddMemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
