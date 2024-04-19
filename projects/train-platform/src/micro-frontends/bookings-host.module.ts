import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';
import { MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';

const getMicrofrontendBundleUrl = (frontendName: 'bookings') =>
  `/frontends/${frontendName}/main.js`;

@NgModule({
  declarations: [
    BookingsHostComponent,
    MicroFrontendRoutingDirective,
    MicroFrontendLanguageDirective,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        canActivate: [LoadMicroFrontendGuard],
        component: BookingsHostComponent,
        data: {
          bundleUrl: environment.production
            ? getMicrofrontendBundleUrl('bookings')
            : 'http://localhost:4201/main.js',
        },
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
