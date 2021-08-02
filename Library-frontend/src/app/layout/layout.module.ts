import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthLayoutComponent } from './app-layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './app-layout/admin-layout/admin-layout.component';
@NgModule({
  declarations: [AuthLayoutComponent, AdminLayoutComponent],
  imports: [CommonModule, NgbModule, MatTabsModule],
})
export class LayoutModule {}
