import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      import('./../micro-frontends/bookings-host.module').then(
        (m) => m.BookingsHostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), JourneyModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
