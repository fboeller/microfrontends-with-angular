import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevPlatformNavbarComponent } from './dev-platform-navbar/dev-platform-navbar.component';
import { DevPlatformPageComponent } from './dev-platform-page/dev-platform-page.component';

@NgModule({
  declarations: [DevPlatformPageComponent, DevPlatformNavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DevPlatformPageComponent,
      },
    ]),
  ],
})
export class BookingsDevPlatformModule {
  static createDevPlatformNavbarElement(injector: Injector): void {
    const customElement = createCustomElement(DevPlatformNavbarComponent, {
      injector,
    });
    window.customElements.define('dev-platform-navbar', customElement);
    console.log(`Defined the custom element 'dev-platform-navbar'`);
  }
}
