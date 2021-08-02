import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { AuthGuard } from './guard/auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { ProductsService } from './service/products.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    AuthGuard,
    AuthService,
    ProductsService,
    DynamicScriptLoaderService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
