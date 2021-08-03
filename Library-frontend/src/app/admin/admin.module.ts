import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [ProfileComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
