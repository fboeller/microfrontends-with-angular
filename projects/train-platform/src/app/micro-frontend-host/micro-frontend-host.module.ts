import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';
import { MicroFrontendHostComponent } from './micro-frontend-host.component';
import { MicrofrontendLanguageDirective as MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';
import { MicrofrontendZoneDirective as MicroFrontendZoneDirective } from './micro-frontend-zone.directive';

const getMicrofrontendBundleUrl = (frontendName: 'bookings') =>
  `/frontends/${frontendName}/main-es2015.js`;

const routes: Routes = [
  {
    path: '**',
    canActivate: [LoadMicroFrontendGuard],
    data: {
      bundleUrl: environment.production
        ? getMicrofrontendBundleUrl('bookings')
        : 'http://localhost:4201/main-es2015.js',
    },
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [
    MicroFrontendHostComponent,
    MicroFrontendLanguageDirective,
    MicroFrontendRoutingDirective,
    MicroFrontendZoneDirective,
  ],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
