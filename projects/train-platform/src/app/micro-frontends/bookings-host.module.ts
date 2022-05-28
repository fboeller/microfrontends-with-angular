import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsHostComponent } from './bookings-host.component';
import { LoadMicroFrontendGuard } from './load-micro-frontend.guard';
import { MicroFrontendLanguageDirective } from './micro-frontend-language.directive';
import { MicroFrontendRoutingDirective } from './micro-frontend-routing.directive';

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
  declarations: [
    BookingsHostComponent,
    MicroFrontendLanguageDirective,
    MicroFrontendRoutingDirective,
  ],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingsHostModule {}
