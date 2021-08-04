import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { AuthGuard } from './guard/auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { ProductsService } from './service/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    RightSidebarService,
    AuthGuard,
    AuthService,
    UserService,
    ProductsService,
    DynamicScriptLoaderService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
