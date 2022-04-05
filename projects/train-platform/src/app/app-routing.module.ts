import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingModule } from '../booking/booking.module';
import { BookingComponent } from '../booking/booking/booking.component';
import { JourneySelectionComponent } from '../journey/journey-selection/journey-selection.component';
import { JourneyModule } from '../journey/journey.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JourneySelectionComponent,
  },
  {
    path: 'bookings/journey/:journeyId',
    component: BookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), JourneyModule, BookingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
