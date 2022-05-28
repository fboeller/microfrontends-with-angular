import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingModule } from '../app/booking.module';
import { DevPlatformPageComponent } from './dev-platform-page/dev-platform-page.component';
import { DevPlatformComponent } from './dev-platform/dev-platform.component';

@NgModule({
  declarations: [DevPlatformComponent, DevPlatformPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: DevPlatformPageComponent,
        data: { title: 'Journeys' },
      },
    ]),
    BookingModule,
  ],
  bootstrap: [DevPlatformComponent],
})
export class DevPlatformModule {}
