import { CommonModule } from '@angular/common';
import { DoBootstrap, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingModule } from '../app/booking/booking.module';
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
      },
    ]),
    BookingModule,
  ],
  bootstrap: [DevPlatformComponent],
})
export class DevPlatformModule implements DoBootstrap {
  ngDoBootstrap(): void {}
}
