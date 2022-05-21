import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoComponent, NoopLocationStrategy } from 'ngx-elements-router';
import { MicroFrontendComponent } from './micro-frontend.component';

const routes: Routes = [
  {
    path: 'bookings',
    component: MicroFrontendComponent,
  },
  { path: '**', component: NoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
    }),
  ],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
