import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';

@NgModule({
  declarations: [BookingsHostComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        canActivate: [LoadMicroFrontendGuard],
        component: BookingsHostComponent,
        data: {
          bundleUrl: 'http://localhost:4201/main.js',
        },
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
