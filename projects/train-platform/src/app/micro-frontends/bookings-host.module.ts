import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';
import { MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';

const getMicrofrontendBundleUrl = (frontendName: 'bookings') =>
  `/frontends/${frontendName}/main.js`;

const routes: Routes = [
  {
    path: '**',
    canActivate: [LoadMicroFrontendGuard],
    data: {
      bundleUrl: environment.production
        ? getMicrofrontendBundleUrl('bookings')
        : 'http://localhost:4201/main.js',
    },
    component: BookingsHostComponent,
  },
];

@NgModule({
  declarations: [
    BookingsHostComponent,
    MicroFrontendLanguageDirective,
    MicroFrontendRoutingDirective,
  ],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
