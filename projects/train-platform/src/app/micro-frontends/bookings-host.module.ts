import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';

const routes: Routes = [
  {
    path: '**',
    canActivate: [LoadMicroFrontendGuard],
    data: {
      bundleUrl: 'http://localhost:4201/main.js',
    },
    component: BookingsHostComponent,
  },
];

@NgModule({
  declarations: [BookingsHostComponent],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
