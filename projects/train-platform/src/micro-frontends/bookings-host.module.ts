import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';
import { MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';

const getMicrofrontendBundleUrl = async (frontendName: 'bookings') => {
  const metaDataJsonUrl = `/frontends/${frontendName}/frontend-meta.json`;
  const frontendMetaData = await fetch(metaDataJsonUrl).then((response) =>
    response.json()
  );
  const entryPointBundleName = frontendMetaData.entryPointBundleName;
  return `/frontends/${frontendName}/${entryPointBundleName}`;
};

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
            : Promise.resolve('http://localhost:4201/main.js'),
        },
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
