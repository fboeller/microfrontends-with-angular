import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoComponent, NoopLocationStrategy } from 'ngx-elements-router';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: 'bookings/journey/:id',
    component: BookingComponent,
  },
  { path: '**', component: NoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
