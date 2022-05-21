import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadBundleGuard } from 'ngx-elements-router';
import { JourneySelectionComponent } from '../journey/journey-selection/journey-selection.component';
import { JourneyModule } from '../journey/journey.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JourneySelectionComponent,
  },
  {
    path: 'bookings',
    canActivate: [LoadBundleGuard],
    data: {
      bundleUrl: 'http://localhost:4201/main-es2015.js', // TODO: configure prod url.
    },
    loadChildren: () =>
      import('./micro-frontend-host/micro-frontend-host.module').then(
        (m) => m.MicroFrontendHostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), JourneyModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
