import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingModule } from '../booking/booking.module';
import { BookingComponent } from '../booking/booking/booking.component';
import { JourneySelectionComponent } from '../journey/journey-selection/journey-selection.component';
import { JourneyModule } from '../journey/journey.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JourneySelectionComponent,
    data: { title: 'Journeys' },
  },
  {
    path: 'bookings/journey/:journeyId',
    component: BookingComponent,
    data: { title: 'Book journey' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), JourneyModule, BookingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
