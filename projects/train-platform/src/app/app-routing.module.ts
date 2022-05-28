import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingModule } from '../booking/booking.module';
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
    path: 'bookings',
    loadChildren: () =>
      import('./../booking/booking.module').then((m) => m.BookingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), JourneyModule, BookingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
